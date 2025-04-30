import { Component, OnInit } from '@angular/core';
import { SystemConstants } from 'src/app/shared';
import { ResponseData } from 'src/app/shared/models';
import { DMTopicService } from 'src/app/shared/services/dm-topic.service';
import { TestResultService } from 'src/app/shared/services/test-result.service';

@Component({
  selector: 'app-giamsat',
  templateUrl: './giamsat.component.html',
  styleUrls: ['./giamsat.component.scss']
})

<<<<<<< HEAD
=======


>>>>>>> 125f059a0fbae95a6f1691e2206f1cec5a9c8811
export class GiamsatComponent implements OnInit {
  listYear = [];
  items = [];
  itemsAvg = [];
  topicScore = [];
  topicId = 0;
  user: any;
  nam: any = new Date().getFullYear();

  listParent = [];

  // columns = ['IdDeThi','AverageScore'];

  constructor(
    private testResultService: TestResultService,
    private dMtopicService: DMTopicService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));

<<<<<<< HEAD
    // Initialize years list only once
=======
>>>>>>> 125f059a0fbae95a6f1691e2206f1cec5a9c8811
    for (let i = new Date().getFullYear(); i > 2020; i--) {
      this.listYear.push(i);
    }

    this.dMtopicService.selectAll(0, 0, '').subscribe(
      (response: ResponseData) => {
        if (response.Status.Code == 1) {
          this.listParent = response.Data.filter(o => o.IdCha <= 0);
          this.topicId = this.listParent[0].TopicId;
        }
      },
    );

    this.loadData();
  }

  loadData() {
<<<<<<< HEAD
    // Remove the redundant year addition
=======
    for (let i=this.nam; i > 2020 ; i--) {
      this.listYear.push(this.nam);
    }
>>>>>>> 125f059a0fbae95a6f1691e2206f1cec5a9c8811
    this.testResultService.selectMaxScoreByUser(this.user.UserId, this.nam).subscribe((res: any) => {
      if (res.Status.Code === 1) {
        this.items = res.Data;
      }
    });

    this.testResultService.selectAvgScoreByUser(this.user.UserId, this.nam).subscribe((res: any) => {
      if (res.Status.Code === 1) {
        this.itemsAvg = res.Data;
      }
    });
    this.loadDataByTopic();
  }

  loadDataByTopic() {
    this.testResultService.selectScoreByTopic(this.user.UserId, this.topicId).subscribe((res: any) => {
      if (res.Status.Code === 1) {
        this.topicScore = res.Data;
      }
    });
  }
}

