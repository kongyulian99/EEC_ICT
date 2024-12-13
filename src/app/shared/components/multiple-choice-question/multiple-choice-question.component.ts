import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { clone } from '../../utilities';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.scss']
})
export class MultipleChoiceQuestionComponent implements OnInit, OnChanges {
  @Input() index;
  @Input() question: any = {};
  @Output() questionChange = new EventEmitter();
  @Output() onExit = new EventEmitter();

  answerId;

  choices = [];

  questionTypes = [
    {Id: 'MULTIPLECHOICE', Name: "Multiple choice"},
    {Id: 'MATCHING', Name: "Matching"},
    {Id: 'FILLINBLANK', Name: "Fill in blank"},
  ];
  questionType = this.questionTypes[0].Id;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['question']) {
      this.choices = JSON.parse(this.question?.Choices);
    }
  }

  handleClickEdit() {
    this.question = {
      ...this.question,
      IsEdit: true
    }
  }

  handleSave() {
    this.question.IsEdit = false;
    this.questionChange.emit(
      {
        ...this.question,
        Choices: JSON.stringify(this.choices)
      }
    )
  }
  handleExit() {
    this.question.IsEdit = false;
  }
}
