import { Component, OnInit } from '@angular/core';
import { dxButtonConfig } from 'src/app/shared/config';

@Component({
  selector: 'app-quiz-prepare',
  templateUrl: './quiz-prepare.component.html',
  styleUrls: ['./quiz-prepare.component.scss']
})
export class QuizPrepareComponent implements OnInit {
  dxButtonConfig = dxButtonConfig;

  listQuestion = [];

  constructor() { }

  ngOnInit(): void {
  }

  save() {}

  addQuestion() {
    this.listQuestion.push({});
  }
}
