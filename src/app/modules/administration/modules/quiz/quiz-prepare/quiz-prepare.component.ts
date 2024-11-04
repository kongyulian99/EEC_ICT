import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService, SystemConstants } from 'src/app/shared';
import { dxButtonConfig } from 'src/app/shared/config';
import { DMDethiService } from 'src/app/shared/services/dm-dethi.service';

@Component({
  selector: 'app-quiz-prepare',
  templateUrl: './quiz-prepare.component.html',
  styleUrls: ['./quiz-prepare.component.scss']
})
export class QuizPrepareComponent implements OnInit {
  loading = false;
  user: any = {};
  dxButtonConfig = dxButtonConfig;

  // listQuestion = [];
  item: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private dMDethiService: DMDethiService,
    private notificationService: NotificationService
  ) {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
   }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('idDeThi')) {
      this.item.IdDeThi = this.activatedRoute.snapshot.paramMap.get('idDeThi');
      this.loadData();
    }
  }

  loadData() {
    this.dMDethiService.selectOne(this.item.IdDeThi).subscribe((res: any) => {
      if(res.Status.Code == 1) {
        this.item = res.Data;
        // this.loadQuestions();
      }
    })
  }

  // loadQuestions() {
  //   this.dMCauhoiService.selectAll(0, 0, '', 0).subscribe((res: any) => {
  //     if(res.Status.Code == 1) {
  //       this.listQuestion = res.Data;
  //     }
  //   })
  // }

  save() {
    // debugger;
    this.dMDethiService.update(this.item).subscribe((res: any) => {
      if(res.Status.Code == 1) {
        this.notificationService.showSuccess("Save succeed!");
      }
    })
  }

  addQuestion() {
    this.item.ListCauHoi.push({
      ChoiceList: [{}, {}, {}, {}]
    });
  }
}
