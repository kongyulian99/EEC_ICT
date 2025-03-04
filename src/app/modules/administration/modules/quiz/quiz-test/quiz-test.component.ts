import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import {
  fixTimezoneToJSON,
  NotificationService,
  SystemConstants,
} from 'src/app/shared';
import { dxButtonConfig } from 'src/app/shared/config';
import { QuestionType } from 'src/app/shared/enum';
import { ResponseData } from 'src/app/shared/models';
import { DMCauhoiService } from 'src/app/shared/services/dm-cauhoi.service';
import { DMDethiService } from 'src/app/shared/services/dm-dethi.service';
import { DMTopicService } from 'src/app/shared/services/dm-topic.service';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.scss'],
})
export class QuizTestComponent implements OnInit {
  loading = false;
  equation: string = 'x^{a}';
  startTime = new Date();
  // options: KatexOptions = {
  //   displayMode: false,
  // };

  dxButtonConfig = dxButtonConfig;
  title = 'Quiz';
  item: any = [];
  countdownTime: number = 3600; // 5 minutes in seconds
  timerSubscription!: Subscription;
  isSubmitted: boolean = false;

  enum_QuestionType = QuestionType;

  questionIndex = 0;

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
    if (this.activatedRoute.snapshot.paramMap.get('idDeThi')) {
      this.item.IdDeThi = this.activatedRoute.snapshot.paramMap.get('idDeThi');
      this.loadData();
    }
    // this.startCountdown();
  }
  // ngAfterViewChecked() {
  //   katex.renderAll();
  // }

  question: any;
  loadData() {
    this.dMDethiService
      .selectOneForTest(this.item.IdDeThi)
      .subscribe((res: any) => {
        if (res.Status.Code == 1) {
          this.item = res.Data;
          this.countdownTime = this.item?.ThoiGianLamBai * 60;
          this.startCountdown();
          this.item.ListCauHoi = this.item.ListCauHoi?.map((element) => {
            return {
              ...element,
              Choices: JSON.parse(element.Choices),
            };
          });
          this.question = this.item.ListCauHoi[this.questionIndex];
          // this.loadQuestions();
        }
      });
  }

  correctCount = 0;
  handleSubmit() {
    this.notificationService.showConfirmation('Do you want to submit?', () => {
      const submitItem: any = {};
      submitItem.ListCauHoi = this.item.ListCauHoi.map((element) => {
        return {
          ...element,
          Choices: JSON.stringify(element.Choices),
        };
      });
      this.dMDethiService
        .submit({
          ...submitItem,
          IdDeThi: this.item.IdDeThi,
          StartTime: fixTimezoneToJSON(this.startTime),
          EndTime: fixTimezoneToJSON(new Date()),
          UserId: this.user.UserId,
        })
        .subscribe((res: any) => {
          if (res.Status.Code == 1) {
            this.stopCountdown();
            this.correctCount = res.Data;
            this.notificationService.showSuccess('Submit successfully!');
            // this.loadQuestions();
          }
        });
    });
  }
  // Hàm chuyển đổi thời gian countdown thành phút và giây
  get displayTime(): string {
    const minutes = Math.floor(this.countdownTime / 60);
    const seconds = this.countdownTime % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }
  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  startCountdown(): void {
    // Sử dụng interval của RxJS để đếm ngược
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.countdownTime > 0) {
        this.countdownTime--;
      } else {
        this.handleSubmit(); // Gọi function submit khi hết giờ
        this.stopCountdown();
      }
    });
  }
  stopCountdown(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  // stopCountdown(): void {
  //   // Unsubscribe from the interval to stop the countdown
  //   if (this.timerSubscription) {
  //     this.timerSubscription.unsubscribe();
  //     this.timerSubscription = null;
  //     console.log('Countdown stopped');
  //   }
  // }

  parseChoices(choiceJsonString) {
    return JSON.parse(choiceJsonString);
  }

  handleSelectQuestion(i) {
    this.question = this.item?.ListCauHoi[i];
    this.questionIndex = i;
  }

  handleNextQuestion() {
    this.questionIndex ++;
    this.questionIndex = this.questionIndex % this.item?.ListCauHoi.length;
    this.question = this.item?.ListCauHoi[this.questionIndex];
  }

  checkAnswered(i) {
    // debugger;
    if(this.item.ListCauHoi[i].QuestionType == QuestionType.FILL_IN_BLANK) {
      return this.item.ListCauHoi[i].Choices.some(o => o.Answer.length > 0);
    } else {
      debugger;
    }
  }
}
