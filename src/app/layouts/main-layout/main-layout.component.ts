import { Component, OnInit } from '@angular/core';
import { RouteEnum } from '../../typings/enums/route.enum';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  route = RouteEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
