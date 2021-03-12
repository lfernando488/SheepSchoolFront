import { AreaService } from './../../services/area.service';
import { Area } from './../../models/area';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  areas: Area[] = [];

  constructor(private areaService:AreaService) { }

  ngOnInit(): void {
    this.GetAreas();
  }

  GetAreas():void{
    this.areaService.getAreas()
    .subscribe(areas => this.areas = areas);
  }

}
