import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Gender } from 'src/app/core/models/enums/gender';
import { Student } from 'src/app/core/models/student';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],

})
export class ProfileEditComponent implements OnInit {
  
  public form!: FormGroup;
  
  genderOptions = Gender;
  selectedGender;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());


  constructor(private formBuilder: FormBuilder, 
              private studentService: StudentService,
              private dialogRef: MatDialogRef<ProfileEditComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Student) {
        this.selectedGender = data.gender;                
}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.data.id],
      username: [this.data.username],
      firstName: [this.data.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      lastName: [this.data.lastName],
      email: [this.data.email],
      phoneNumber:[this.data.phoneNumber],
      birthDate: [this.data.birthDate],
      gender: [this.data.gender],
      portfolioURL: [this.data.portfolioURL]
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.studentService.updateStudent(this.form.value).subscribe(result => {
        this.dialogRef.close(result);
      })
    }else{
      alert("Necessita corrigir");
    }
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
