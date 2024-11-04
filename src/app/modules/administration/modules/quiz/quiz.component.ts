import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { KatexOptions } from 'ng-katex';
import { SystemConstants } from 'src/app/shared';
import { dxButtonConfig } from 'src/app/shared/config';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  user: any;
  // options: KatexOptions = {
  //   displayMode: false,
  // };
  keyword = '';

  dxButtonConfig = dxButtonConfig;
  items: any = [];
  constructor(
    private router: Router
      ) {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER) as string);
  }

  ngOnInit(): void {
    this.loadData();
  }

  onFilter() {
    this.loadData();
  }

  loadData() {

  }

  addTest() {
    this.router.navigate(['/quiz/prepare'])
  }
}
