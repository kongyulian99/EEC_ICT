import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clone, NotificationService } from 'src/app/shared';
import { dxButtonConfig, PaginatorConfig } from 'src/app/shared/config';
import { ResponseData } from 'src/app/shared/models';
import { DMCauhoiService } from 'src/app/shared/services/dm-cauhoi.service';

@Component({
  selector: 'app-dm-cauhoi',
  templateUrl: './dm-cauhoi.component.html',
  styleUrls: ['./dm-cauhoi.component.scss'],
})
export class DMcauhoiComponent implements OnInit {
  @ViewChild('detail', { static: false }) detail: any;
  placeholderSearch = 'Type a question name ...';
  title = 'List question';
  optionsBtnFilter = {
    icon: 'find',
    type: 'default',
    visible: true,
    onClick: this.onFilter.bind(this),
  };
  dxButtonConfig = dxButtonConfig;

  //status
  isShowDetail = true;
  focusKey = '';
  state: string = 'detail';
  autoNavigateToFocusedRow = true;
  loading = false;
  isLa: boolean = true;

  //pagination
  pageSize: number = PaginatorConfig.pageSize;
  pageSizes: number[] = PaginatorConfig.allowedPageSizes;
  pageIndex: number = 1;
  totalRows: number = 0;

  textSearch: string = '';

  //data
  allData: any[] = [];
  currentEntity: any = {};
  expandedIds: any[] = [];

  constructor(
    private dMcauhoiService: DMCauhoiService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getInitial();
  }
  loadData() {
    this.loading = true;
    this.dMcauhoiService.selectAll(this.pageSize, this.pageIndex, this.textSearch).subscribe(
      (response: ResponseData) => {
        if (response.Status.Code == 1) {
          this.allData = response.Data;
          if (response.Data.length > 0) {
            // this.listData = response.Data;
            // this.paging();
            this.currentEntity = this.allData[0];
            this.focusKey = this.currentEntity.QuestionId;
          } else {
            this.focusKey = '';
            this.currentEntity = {};
            setTimeout(() => {
              this.detail.validationEntity.instance.reset();
            }, 10);
            this.state = 'detail';
          }
          this.totalRows = response.Pagination.TotalRows;
        } else {
          this.notificationService.showError('Dữ liệu tải lỗi!');
          this.totalRows = 0;
        }
        this.loading = false;
      },
      (_: any) => {
        this.notificationService.showError('Hệ thống xảy ra lỗi!');
        this.totalRows = 0;
        this.loading = false;
      }
    );
  }

  getInitial() {
    const paramsFromRouter = this.route.snapshot.queryParamMap;
    let queryParams: any = {};
    if (!paramsFromRouter.get('pageSize')) {
      queryParams.pageSize = this.pageSize.toString();
    }
    if (!paramsFromRouter.get('pageIndex')) {
      queryParams.pageIndex = this.pageIndex.toString();
    }
    if (!paramsFromRouter.get('textSearch')) {
      queryParams.textSearch = this.textSearch;
    }
    this.router
      .navigate(['./categories/cauhoi'], {
        queryParams,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        this.getParams();
        this.loadData();
      });
  }
  getParams() {
    const queryParams = this.route.snapshot.queryParamMap;
    const queryPageSize = queryParams.get('pageSize');
    const queryPageIndex = queryParams.get('pageIndex');
    const queryText = queryParams.get('textSearch');

    this.pageSize =
      queryPageSize &&
      !isNaN(parseInt(queryPageSize, 10)) &&
      PaginatorConfig.allowedPageSizes.includes(parseInt(queryPageSize, 10))
        ? parseInt(queryPageSize, 10)
        : PaginatorConfig.pageSize;
    this.pageIndex =
      queryPageIndex && parseInt(queryPageIndex, 10) > 0
        ? parseInt(queryPageIndex, 10)
        : 1;
    this.textSearch = queryText && queryText.length > 0 ? queryText : '';
  }
  // pagination
  // paging() {
  //   const fromIndex = this.pageSize * (this.pageIndex - 1);
  //   const toIndex = fromIndex + this.pageSize;
  //   this.listData = this.allData.slice(fromIndex, toIndex);
  // }
  pageChanged(event: any) {
    // if (this.totalRows > 0) {
    //   this.paging();
    // }
    this.router
      .navigate(['/categories/cauhoi'], {
        queryParams: { page: event.page },
        queryParamsHandling: 'merge',
      })
      .then(() => this.loadData());
  }
  pageSizeChanged(event: any) {
    // if (this.totalRows > 0) {
    //   this.paging();
    // }
    this.router
      .navigate(['/categories/cauhoi'], {
        queryParams: { pageSize: event.pageSize },
        queryParamsHandling: 'merge',
      })
      .then(() => this.loadData());
  }
  onFilter() {
    this.router
      .navigate(['/categories/cauhoi'], {
        queryParams: { textSearch: this.textSearch },
        queryParamsHandling: 'merge',
      })
      .then(() => this.loadData());
  }
  add() {
    this.detail.entity = {};
    this.detail.entity.HienThi = false;
    this.state = 'insert';
    this.detail.validationEntity.instance.reset();
  }
  edit() {
    this.state = 'edit';
  }
  cancel() {
    this.state = 'detail';
    this.detail.entity.Macauhoi = -1;
    setTimeout(() => {
      this.detail.entity = this.currentEntity;
    }, 10);
  }
  save() {
    if (!this.detail.validationEntity.instance.validate().isValid) {
      this.notificationService.showError('Thông tin nhập không hợp lệ!');
      return;
    }

    if(this.detail.entity.ChoiceList.length < 4) {
      this.notificationService.showError("One question must have more than 4 choices!");
      return;
    }

    const body = clone(this.detail.entity);

    if (this.state == 'insert') {
      //
      this.dMcauhoiService.insert(body).subscribe(
        (response: ResponseData) => {
          if (response.Status.Code == 1) {
            this.notificationService.showSuccess(
              'Add a question successfully!'
            );
            // this.loadData();
            this.router.navigate(['categories/dm-cauhoi']).then(() => this.getInitial());
          } else {
            this.notificationService.showError('Error!' + response.Status.Message);
          }
        },
        (_: any) => {
          this.notificationService.showError('System error!');
        }
      );
    } else {
      // debugger;
      this.dMcauhoiService.update(body).subscribe(
        (response: ResponseData) => {
          if (response.Status.Code == 1) {
            this.notificationService.showSuccess('Update successfully!');
            // const index1 = this.listData.findIndex(
            //   (o) => o.Macauhoi == response.Data
            // );
            // this.listData[index1] = this.detail.entity;
            const index2 = this.allData.findIndex(
              (o) => o.Macauhoi == response.Data
            );
            this.allData[index2] = this.detail.entity;
            this.state = 'detail';
          } else {
            this.notificationService.showError('Error!' + response.Status.Message);
          }
        },
        (_: any) => {
          this.notificationService.showError('System error!');
        }
      );
    }
  }
  delete(id: any, name: string) {
    this.notificationService.showConfirmation(
      "Do you want to delete question '" + name + "'?",
      () => {
          this.dMcauhoiService.delete(id).subscribe(
            (response: ResponseData) => {
              if (response.Status.Code == 1) {
                this.allData = this.allData.filter((o) => o.QuestionId != id);
                this.totalRows = this.allData.length;
                // this.paging();
                this.notificationService.showSuccess(
                  "Đã xóa thành công question '" + name + "'!"
                );
              } else {
                this.notificationService.showError('Xoá question không thành công!' + response.Status.Message);
              }
            },
            (_: any) => {
              this.notificationService.showError('Lỗi hệ thống!');
            }
          );
        if (this.allData.length <= 0) {
          this.currentEntity = {};
          this.currentEntity.HienThi = false;
        } else {
          this.currentEntity = this.allData[0];
        }
        this.focusKey = this.currentEntity.QuestionId;
        this.state = 'detail';
      }
    );
  }

  toggleDetail() {
    this.isShowDetail = !this.isShowDetail;
  }
  onFocusedRowChanged(e: any) {
    this.currentEntity = clone(e.row.data);
    this.state = 'detail';
  }
}
