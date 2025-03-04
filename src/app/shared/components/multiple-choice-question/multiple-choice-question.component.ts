import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { clone } from '../../utilities';
import { QuestionType } from '../../enum';
import { DMCauhoiService } from '../../services/dm-cauhoi.service';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.scss']
})
export class MultipleChoiceQuestionComponent implements OnInit, OnChanges {
  @Input() index;
  @Input() question: any;
  @Output() questionChange = new EventEmitter<any>();
  @Output() onExit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  answerId;

  choices = [];

  enum_QuestionType = QuestionType;
  questionTypes = [
    {Id: QuestionType.MULTIPLE_CHOICE, Name: "Multiple choice"},
    {Id: QuestionType.MATCHING, Name: "Matching"},
    {Id: QuestionType.FILL_IN_BLANK, Name: "Fill in blank"},
  ];
  // questionType = this.questionTypes[0].Id;

  constructor(
    private dmCauHoiService: DMCauhoiService
  ) { }

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
    // debugger;
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

  handleDelete() {
    if(this.question?.QuestionId > 0) {
      this.dmCauHoiService.delete(this.question.QuestionId).subscribe((res:any) => {
        if(res.Status.Code == 1) {
          this.onDelete.emit(this.question);
        }
      })
    }
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

  handleChangeTopicId(event) {
    this.question.TopicId = event;
  }
}
