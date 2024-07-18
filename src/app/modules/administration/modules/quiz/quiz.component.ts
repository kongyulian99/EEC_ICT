import { ResponseData, Status } from './../../../../shared/models/responseData';
import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';
import { NotificationService, SystemConstants } from 'src/app/shared';
import { dxButtonConfig } from 'src/app/shared/config';
import { DMCauhoiService } from 'src/app/shared/services/dm-cauhoi.service';
import { DMTopicService } from 'src/app/shared/services/dm-topic.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  equation: string = 'x^{a}';
  options: KatexOptions = {
    displayMode: false,
  };

  dxButtonConfig = dxButtonConfig;
  title = 'Quiz';
  items: any = [];
  constructor(
    private dMCauhoiService: DMCauhoiService,
    private dmTopicService: DMTopicService,
    private notificationService: NotificationService
  ) { }


  user: any;
  allTopic = [];
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER) as string);
    this.dmTopicService.selectAll(0, 0, '').subscribe(
      (res: ResponseData) => {
        if (res.Status.Code == 1) {
          this.allTopic = res.Data;
        }
      }
    );
    this.dMCauhoiService.selectAll(0, 0, '', 0).subscribe((res:any) => {
      if(res.Status.Code === 1) {
        this.items = res.Data;
      }
    })
  }
  // ngAfterViewChecked() {
  //   katex.renderAll();
  // }

  topicId = 1;
  handleChangeTopic($event) {
    // console.log($event.value);
    this.dMCauhoiService.selectAll(0, 0, '', $event.value).subscribe((res:any) => {
      if(res.Status.Code === 1) {
        this.items = res.Data;
      }
    })
  }

  listSelection = [];
  handleChangeSelection(event) {
    // debugger;
    let index = this.listSelection.findIndex(o => o.QuestionId == event.value.QuestionId);
    if(index < 0) {
      this.listSelection.push(event.value);
    } else {
      this.listSelection[index].AnswerId = event.value.AnswerId;
    }
    console.log(this.listSelection);
  }

  handleSubmit() {
    // debugger;
    if(this.listSelection.length < this.items.length) {
      this.notificationService.showConfirmation("There are some question not answer! Still submit?", () => {
        this.dMCauhoiService.checkCorrect(this.listSelection, this.user.UserId).subscribe((res: any) => {
          if(res.Status.Code === 1) {
            this.notificationService.showSuccess("Submit success, you've got score" + res.Data);
          }
        })
      })
    }
  }
}
