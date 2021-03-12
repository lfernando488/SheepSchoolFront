import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ErrorDialogService } from 'src/app/core/error-handler/error-dialog.service';
import { Area } from 'src/app/core/models/area';
import { CourseNew } from 'src/app/core/models/dto/course-new';
import { CourseLevel } from 'src/app/core/models/enums/course-level';
import { Instructor } from 'src/app/core/models/instructor';
import { AreaService } from 'src/app/core/services/area.service';
import { CourseService } from 'src/app/core/services/course.service';
import { InstructorService } from 'src/app/core/services/instructor.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit, AfterViewInit {

  newCourseForm1!: FormGroup;
  newCourseForm2!: FormGroup;
  requirements!: FormArray;
  willLearn!: FormArray;
  wontLearn!: FormArray;
  
  courseLevelLabel = CourseLevel[1];
  courseScoreLabel = 50;

  areas: Area[] = [];
  selectedAreas: number[] = [];
  
  displayedInstructorsColumns: string[] = ['firstName', 'lastName', 'select'];
  instructors = new MatTableDataSource<Instructor>();
  isInstructorsLoadingResults = true;
  isInstructorsRateLimitReached = false;
  instructorsSelection = new SelectionModel<Instructor>(true, []);
  instructorsIds: number[] = [];
  author!: Instructor;
  
  @ViewChild(MatSort) instructorsSort!: MatSort;
  constructor(private _formBuilder: FormBuilder,
    private messageService: MessageService,
    private errorDialogService: ErrorDialogService,
    private areaService: AreaService,
    private instructorService: InstructorService,
    private courseService: CourseService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.instructorService.getInstructorUser().subscribe(instructor => this.author = instructor);

    this.areaService.getAreas()
      .subscribe(areas => this.areas = areas);

    this.newCourseForm1 = this._formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      shortDescription: ['', Validators.required],
      courseLevel: [''],
      courseScore: [''],
    });

    this.requirements = new FormArray([]);
    this.requiredFormControls(this.requirements, 3);
    
    this.willLearn = new FormArray([]);
    this.requiredFormControls(this.willLearn, 3);
    this.wontLearn = new FormArray([]);
    this.requiredFormControls(this.wontLearn, 3);

    this.newCourseForm2 = this._formBuilder.group({
      longDescription: [''],
      requirements: this.requirements,
      willLearn: this.willLearn,
      wontLearn: this.wontLearn
    });
  }

  ngAfterViewInit(): void {
    this.loadInstructorsTable();
  }

  onCourseLevelSliderChange(event: MatSliderChange) {
    this.courseLevelLabel = CourseLevel[event.value!];
  }
 
  onCourseScoreSliderChange(event: MatSliderChange) {
    this.courseScoreLabel = event.value!;
  }

  changeSelectedAreas(area: Area) {
    const addArea = () => this.selectedAreas.push(area.id);
    const removeArea = () => {
      const indexToRemove = this.selectedAreas.indexOf(area.id);
        if (indexToRemove > -1) this.selectedAreas.splice(indexToRemove, 1);
    };
    this.selectedAreas.includes(area.id) ? removeArea() : addArea();
  }

  addFormControl(formArray: FormArray) {
    if (formArray.length >= 12) {
      this.messageService.openSnackBar("O máximo de itens é 12.", "Entendi...")
      return;
    }
    formArray.push(new FormControl(''));
  }

  removeFormControl(formArray: FormArray, i: number) {
    if (formArray.length <= 3) {
      this.messageService.openSnackBar("O mínimo de itens é 3.", "Entendi...")
      return;
    }
    formArray.removeAt(i);
  }
  
  requiredFormControls(formArray: FormArray, amount: number): any {
    if (amount === 0) return;
    formArray.push(new FormControl(''));
    return this.requiredFormControls(formArray, amount - 1);
  }

  loadInstructorsTable(){
    this.instructorService.getAllButUser()
    .subscribe(data => {
      this.instructors.data = data;
      this.instructors.sort = this.instructorsSort;
    });
  }

  instructorsIsAllSelected() {
    const numSelected = this.instructorsSelection.selected.length;
    const numRows = this.instructors.data.length;
    return numSelected === numRows;
  }

  instructorsMasterToggle() {
    this.instructorsIsAllSelected() ?
        this.instructorsSelection.clear() :
        this.instructors.data.forEach(row => this.instructorsSelection.select(row));
  }

  instructorCheckboxLabel(row?: Instructor): string {
    if (!row) {
      return `${this.instructorsIsAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.instructorsSelection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  setInstructorsIdsList(){
    if (this.instructorsIds.length > 0) this.instructorsIds = [];
      this.instructorsIds.push(this.author.id),
      this.instructorsSelection.selected.map(instructor => this.instructorsIds.push(instructor.id))
  }

  onSaveNewCourse(){
    if(!this.newCourseForm1.valid){
      this.errorDialogService.openErrorDialog("Você precisa preencher pelo menos os dados básicos do curso.");
      return;
    }
    this.setInstructorsIdsList();
      const courseNew = new CourseNew(this.newCourseForm1.controls.title.value,
                                      this.newCourseForm1.controls.subtitle.value,
                                      this.newCourseForm1.controls.shortDescription.value,
                                      this.newCourseForm1.controls.courseLevel.value,
                                      this.newCourseForm1.controls.courseScore.value,
                                      this.newCourseForm2.controls.longDescription.value,
                                      this.selectedAreas,
                                      this.newCourseForm2.controls.requirements.value,
                                      this.newCourseForm2.controls.willLearn.value,
                                      this.newCourseForm2.controls.wontLearn.value,
                                      this.instructorsIds);
                                      console.log(courseNew);
      this.courseService.createCourse(courseNew).subscribe(data => {
        this.router.navigateByUrl("dashboard");
      });
  }
}
