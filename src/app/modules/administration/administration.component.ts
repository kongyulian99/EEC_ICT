import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrationComponent implements OnInit {

  collapedSideBar: boolean = false;

  constructor() {}

  ngOnInit() {}

  receiveCollapsed($event: any) {
    this.collapedSideBar = $event;
  }
}
