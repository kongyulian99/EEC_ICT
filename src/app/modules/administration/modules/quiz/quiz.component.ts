import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
// import { KatexOptions } from 'ng-katex';
import { NotificationService, SystemConstants } from 'src/app/shared';
import { dxButtonConfig, PaginatorConfig } from 'src/app/shared/config';
import { DMDethiService } from 'src/app/shared/services/dm-dethi.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  loading = false;
  user: any;
  // options: KatexOptions = {
  //   displayMode: false,
  // };
  keyword = '';
  pageSize = PaginatorConfig.pageSize;
  pageIndex = 1;
  pageSizes = PaginatorConfig.allowedPageSizes;

  totalRows = 0;

  dxButtonConfig = dxButtonConfig;
  items: any = [];
  constructor(
    private router: Router,
    private dMDethiService: DMDethiService,
    private notificationService: NotificationService
      ) {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER) as string);
  }

  ngOnInit(): void {
    this.loadData();
  }

  onFilter() {
    this.loadData();
  }

  loadData() {
    this.dMDethiService.selectAll(this.pageSize, this.pageIndex, this.keyword)
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe((res: any) => {
      if(res.Status.Code === 1) {
        this.items = res.Data;
        this.totalRows = res.Pagination.TotalRows;
      } else {
        this.notificationService.showError("Get test list failed!");
      }
    })
  }

  item: any = {};
  isShowPopup = false;
  addTest() {
    this.isShowPopup = true;
  }

  save() {
    this.dMDethiService.insert(this.item)
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe((res: any) => {
      if(res.Status.Code === 1) {
        this.notificationService.showSuccess("Add new test succeed!");
        this.isShowPopup = false;
        this.router.navigate(['quiz/list']).then(() => this.loadData());
      } else {
        this.notificationService.showError("Add new test failed!");
      }
    })
    // this.isShowPopup = false;
  }

  navigateToTestDetail() {
    this.router.navigate(['/quiz/prepare'])
  }

  handleDelete(item) {
    this.notificationService.showConfirmation("Are you sure to delete this test?", () => {
      this.dMDethiService.delete(item.IdDeThi).subscribe((res: any) => {
        if(res.Status.Code == 1) {
          this.notificationService.showSuccess("Delete test succeed!");
          this.items = this.items.filter(o => o.IdDeThi != item.IdDeThi);
        } else {
          this.notificationService.showError("Delete failed!");
        }
      })
    })
  }
}
