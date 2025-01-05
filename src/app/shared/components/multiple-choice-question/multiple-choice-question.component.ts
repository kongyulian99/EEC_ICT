import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { clone } from '../../utilities';
import { QuestionType } from '../../enum';

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

  enum_QuestionType = QuestionType;
  questionTypes = [
    {Id: QuestionType.MULTIPLE_CHOICE, Name: "Multiple choice"},
    {Id: QuestionType.MATCHING, Name: "Matching"},
    {Id: QuestionType.FILL_IN_BLANK, Name: "Fill in blank"},
  ];
  // questionType = this.questionTypes[0].Id;

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

  handleChangeQuestionType(event) {
    if(event.value == this.enum_QuestionType.MULTIPLE_CHOICE) {
      this.choices = [
        {
          Id: 1,
          Answer: '',
          IsCorrect: false
        },
        {
          Id: 2,
          Answer: '',
          IsCorrect: false
        },
        {
          Id: 3,
          Answer: '',
          IsCorrect: false
        },
        {
          Id: 4,
          Answer: '',
          IsCorrect: false
        }
      ];
    } else if(event.value == this.enum_QuestionType.FILL_IN_BLANK) {
      this.choices = [

      ]
    }
  }

  handleAddFillInBlankAnswer() {
    this.choices.push({
      Id: Math.max(...this.choices.map(choice => choice.Id)) + 1,
      Answer: ''
    })
  }
  handleDeleteFillInBlankAnswer(id) {
    // const index = this.choices.findIndex(o => o.Id == id);
    this.choices = this.choices.filter(o => o.Id != id);
  }
}
