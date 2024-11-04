import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService, SystemConstants } from 'src/app/shared';
import { dxButtonConfig } from 'src/app/shared/config';
import { ResponseData } from 'src/app/shared/models';
import { DMCauhoiService } from 'src/app/shared/services/dm-cauhoi.service';
import { DMDethiService } from 'src/app/shared/services/dm-dethi.service';
import { DMTopicService } from 'src/app/shared/services/dm-topic.service';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.scss']
})
export class QuizTestComponent implements OnInit {
  loading = false;
  equation: string = 'x^{a}';
  // options: KatexOptions = {
  //   displayMode: false,
  // };

  dxButtonConfig = dxButtonConfig;
  title = 'Quiz';
  item: any = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dMDethiService: DMDethiService,
    private notificationService: NotificationService
  ) {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  }


  user: any;
  allTopic = [];
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('idDeThi')) {
      this.item.IdDeThi = this.activatedRoute.snapshot.paramMap.get('idDeThi');
      this.loadData();
    }
  }
  // ngAfterViewChecked() {
  //   katex.renderAll();
  // }

  loadData() {
    this.dMDethiService.selectOne(this.item.IdDeThi).subscribe((res: any) => {
      if(res.Status.Code == 1) {
        this.item = res.Data;
        // this.loadQuestions();
      }
    })
  }

  // topicId = 1;
  // handleChangeTopic($event) {
  //   // console.log($event.value);
  //   this.dMCauhoiService.selectAll(0, 0, '', $event.value).subscribe((res:any) => {
  //     if(res.Status.Code === 1) {
  //       this.items = res.Data;
  //     }
  //   })
  // }

  // listSelection = [];
  // handleChangeSelection(event) {
  //   // debugger;
  //   let index = this.listSelection.findIndex(o => o.QuestionId == event.value.QuestionId);
  //   if(index < 0) {
  //     this.listSelection.push(event.value);
  //   } else {
  //     this.listSelection[index].AnswerId = event.value.AnswerId;
  //   }
  //   console.log(this.listSelection);
  // }

  handleSubmit() {
    // debugger;
    // if(this.listSelection.length < this.items.length) {
    //   this.notificationService.showConfirmation("There are some question not answer! Still submit?", () => {
    //     this.dMCauhoiService.checkCorrect(this.listSelection, this.user.UserId).subscribe((res: any) => {
    //       if(res.Status.Code === 1) {
    //         this.notificationService.showSuccess("Submit success, you've got score" + res.Data);
    //       }
    //     })
    //   })
    // }
  }
}
