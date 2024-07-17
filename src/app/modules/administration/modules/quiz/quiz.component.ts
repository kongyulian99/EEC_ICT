import { Status } from './../../../../shared/models/responseData';
import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';
import { dxButtonConfig } from 'src/app/shared/config';
import { DMCauhoiService } from 'src/app/shared/services/dm-cauhoi.service';

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
    private dMCauhoiService: DMCauhoiService
  ) { }



  ngOnInit(): void {
    this.dMCauhoiService.selectAll(0, 0, '', 0).subscribe((res:any) => {
      if(res.Status.Code === 1) {
        this.items = res.Data;
      }
    })
  }
  // ngAfterViewChecked() {
  //   katex.renderAll();
  // }
}
