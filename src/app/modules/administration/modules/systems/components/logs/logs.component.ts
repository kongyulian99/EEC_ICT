import { Component, OnInit } from "@angular/core";
import { dxButtonConfig, PaginatorConfig } from "src/app/shared/config";
import { LogsService } from "src/app/shared/services/logs.service";

@Component({
    selector: 'app-logs',
    templateUrl: 'logs.component.html'
})
export class LogsComponent implements OnInit {
    dxButtonConfig = dxButtonConfig;
    PaginatorConfig = [5, 10, 25, 50, 100];
    items: any = [];
    tuNgay: any = new Date().setDate(new Date().getDate() - 1);
    denNgay: any = new Date().setDate(new Date().getDate() + 1);
    keyword: any = '';
    pageSize: number = 10;
    pageIndex : number = 1;
    totalRows: number = 0;

    constructor (
        private logsService: LogsService
    ) {}
    ngOnInit(): void {
        this.loadDataSource();
    }

    loadDataSource () {
        this.logsService.selectForFilter(this.keyword, new Date(this.tuNgay), new Date(this.denNgay), this.pageIndex, this.pageSize)
            .subscribe({ next: (res: any) => {
                if (res.Status.Code === 1) {
                    this.items = res.Data;
                    this.totalRows = res.Pagination.TotalRows;
                }
            }})
    }

    handlePageChange(event: any)
    {
        // redirect to this page with query params
        this.pageIndex = event.page;
        this.loadDataSource();        
    }

    handlePageSizeChange(event: any)
    {
        // redirect to this page with query params
        this.pageSize = event.pageSize;
        this.pageIndex = 1;
        this.loadDataSource();
    }
}