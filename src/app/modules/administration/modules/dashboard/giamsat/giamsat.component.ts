import { Component, OnInit } from '@angular/core';
import { SystemConstants } from 'src/app/shared';
import { TestResultService } from 'src/app/shared/services/test-result.service';

@Component({
  selector: 'app-giamsat',
  templateUrl: './giamsat.component.html',
  styleUrls: ['./giamsat.component.scss']
})



export class GiamsatComponent implements OnInit {
  listYear=[];
  items = [];
  itemsAvg = [];
  user: any;
  nam: any = new Date().getFullYear();

  columns = ['IdDeThi','AverageScore'];

  constructor(
    private testResultService: TestResultService
  ) { }

  ngOnInit(): void {


    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.testResultService.selectMaxScoreByUser(this.user.UserId, this.nam).subscribe((res: any) => {
      if(res.Status.Code === 1) {
        this.items = res.Data;
      }
    });

    this.testResultService.selectAvgScoreByUser(this.user.UserId, this.nam).subscribe((res: any)=> {
      if(res.Status.Code ===1) {
        this.itemsAvg = res.Data;
      }
    });

    for (this.nam; this.nam > 2023 ; this.nam--) {
      this.listYear.push(this.nam);
    }
  }
}

