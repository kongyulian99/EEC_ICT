import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dxButtonConfig } from 'src/app/shared/config';
import { QuestionType } from 'src/app/shared/enum';
import { DMCauhoiService } from 'src/app/shared/services/dm-cauhoi.service';
import { DMTopicService } from 'src/app/shared/services/dm-topic.service';

@Component({
  selector: 'app-topic-training-list',
  templateUrl: './topic-training-list.component.html',
  styleUrls: ['./topic-training-list.component.scss'],
})
export class TopicTrainingListComponent implements OnInit {
  listTopic = [];
  // listTopicForHienThi = [];
  idCha = 0;
  dxButtonConfig = dxButtonConfig;
  // listIdCha = [];
  listCauHoi = [];

  constructor(
    private dMTopicService: DMTopicService,
    private router: Router,
    private route: ActivatedRoute,
    private dmCauHoiService: DMCauhoiService
  ) {}

  // topicId: any;
  ngOnInit(): void {
    this.dMTopicService.selectAll(0, 0, '').subscribe((res: any) => {
      if (res.Status.Code == 1) {
        this.listTopic = res.Data;
        // this.topicId = this.listTopic[0].TopicId;
      }
    });
  }

  // loadParams() {
  //   const queryParams = this.route.snapshot.queryParamMap;
  //   const queryIdCha = queryParams.get('IdCha');

  //   this.idCha =
  //   queryIdCha &&
  //     !isNaN(parseInt(queryIdCha, 10)) ? parseInt(queryIdCha, 10) : 0;
  // }

  questionIndex = 0;
  enum_QuestionType = QuestionType;
  handleOpenTopic(topic) {
    // if (this.listIdCha.length < 1) {
    //   this.listIdCha.push(topic.TopicId);
    //   this.idCha = topic.TopicId;
    // } else {
    //   this.dmCauHoiService.selectAllForTest(0, 0, '', topic.TopicId).subscribe((res: any) => {
    //     if(res.Status.Code === 1) {
    //       this.listIdCha.push(topic.TopicId);
    //       this.idCha = topic.TopicId;
    //       this.listCauHoi = res.Data.map((element) => {
    //         return {
    //           ...element,
    //           Choices: JSON.parse(element.Choices),
    //         };
    //       });
    //       this.question = this.listCauHoi.length > 0 ? this.listCauHoi[0] : {};
    //     }
    //   })
    // }
    this.dmCauHoiService.selectAllForTest(0, 0, '', topic.TopicId).subscribe((res: any) => {
      if(res.Status.Code === 1) {
        // this.listIdCha.push(topic.TopicId);
        // this.idCha = topic.TopicId;
        this.listCauHoi = res.Data.map((element) => {
          return {
            ...element,
            Choices: JSON.parse(element.Choices),
          };
        });
        this.question = this.listCauHoi.length > 0 ? this.listCauHoi[0] : null;
      }
    })
  }

  checkAnswered(i) {
    if(this.listCauHoi[i].QuestionType == QuestionType.FILL_IN_BLANK) {
      return this.listCauHoi[i].Choices?.some(o => o.Answer.length > 0);
    } else {
      return this.listCauHoi[i].Choices?.some(o => o.IsCorrect == true);
    }
  }

  handleSelectQuestion(i) {
    this.question = this.listCauHoi[i];
    this.questionIndex = i;
  }

  question: any = null;
  handleNextQuestion() {
    this.questionIndex ++;
    this.questionIndex = this.questionIndex % this.listCauHoi.length;
    this.question = this.listCauHoi[this.questionIndex];
  }

  getListTopic() {
    return this.listTopic.filter((o) => o.IdCha == this.idCha);
  }

  // handleBackToParent() {
  //   // this.listIdCha.pop();
  //   // this.idCha = this.listIdCha.length > 0 ? this.listIdCha[0] : 0;
  // }

  handleSubmit() {
    console.log(this.listCauHoi);
  }

  onItemClick(e) {
    // console.log(e);
    // debugger;
    this.handleOpenTopic(e.itemData);
  }
}
