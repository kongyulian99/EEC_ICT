import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { finalize } from 'rxjs';
import { NotificationService, SystemConstants } from 'src/app/shared';
import { dxButtonConfig } from 'src/app/shared/config';
import { QuestionType } from 'src/app/shared/enum';
import { DMDethiService } from 'src/app/shared/services/dm-dethi.service';

@Component({
  selector: 'app-quiz-prepare',
  templateUrl: './quiz-prepare.component.html',
  styleUrls: ['./quiz-prepare.component.scss']
})
export class QuizPrepareComponent implements OnInit {
  @ViewChild('validationEntity', {static: false}) validationEntity!: DxValidationGroupComponent;
  loading = false;
  user: any = {};
  dxButtonConfig = dxButtonConfig;

  enum_QuestionType = QuestionType;
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
    this.loading = true;
    this.dMDethiService.selectOne(this.item.IdDeThi)
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe((res: any) => {
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
    // debugger
    if (!this.validationEntity.instance.validate().isValid) {
      this.notificationService.showError('Thông tin nhập không hợp lệ!');
      return;
    }
    if(this.item?.ListCauHoi.some(o => o.TopicId <= 0)) {
      this.notificationService.showError("Chưa chọn topic cho 1 số câu hỏi");
      return;
    }
    this.dMDethiService.update(this.item).subscribe((res: any) => {
      if(res.Status.Code == 1) {
        this.notificationService.showSuccess("Save succeed!");
      }
    })
  }

  addQuestion() {
    this.item.ListCauHoi.push({
      IdDeThi: this.item.IdDeThi,
      Question: '',
      Choices: JSON.stringify(
        [
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
        ]
      ),
      Note: '',
      QuestionType: 1,
      IsEdit: true
    });
  }

  handleChangeQuestion(event, i) {
    // const id = this.item.ListCauHoi.findIndex(o => o == question);
    this.item.ListCauHoi[i] = event;
    // question = event;
  }

  handleExitEdit(question, i) {
    // const id = this.item.ListCauHoi.findIndex(o => o == question);
    question = this.item.ListCauHoi[i];
  }

  handleDeleteQuestion(event) {
    this.item.ListCauHoi = this.item.ListCauHoi.filter(o => o != event);
    this.notificationService.showSuccess("Delete question succeed!");
  }
}
