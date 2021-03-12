import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/core/models/area';
import { AreaService } from 'src/app/core/services/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  area?: Area;
  
  constructor(private route: ActivatedRoute,
              private location: Location,
              private areaService: AreaService) { }

  ngOnInit(): void {
    this.getArea();
  }
  getArea(): void {
    const areaPermalink = this.route.snapshot.url.pop()!.path;
    this.areaService.getAreasByPermalink(areaPermalink)
      .subscribe(area => this.area = area);
  }
  goBack(): void {
    this.location.back();
  }
}
