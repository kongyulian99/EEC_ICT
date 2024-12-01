import { Component, OnInit } from '@angular/core';
import { SystemConstants } from 'src/app/shared';
import { TestResultService } from 'src/app/shared/services/test-result.service';

@Component({
  selector: 'app-giamsat',
  templateUrl: './giamsat.component.html',
  styleUrls: ['./giamsat.component.scss']
})
export class GiamsatComponent implements OnInit {
  items = [];
  user: any;
  constructor(
    private testResultService: TestResultService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.testResultService.selectMaxScoreByUser(this.user.UserId).subscribe((res: any) => {
      if(res.Status.Code === 1) {
        this.items = res.Data;
      }
    })
  }

}
