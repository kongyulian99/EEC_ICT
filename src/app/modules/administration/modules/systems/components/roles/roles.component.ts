import { FormRoleDetailComponent } from './form-role-detail/form-role-detail.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { clone, NotificationService, RoleService, SystemConstants, User } from 'src/app/shared';
import { dxButtonConfig, PaginatorConfig } from 'src/app/shared/config';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseData } from 'src/app/shared/models';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  @ViewChild('detail', {static: false}) detail!: FormRoleDetailComponent;
  placeholderSearch = 'Nhập tên nhóm quyền...';
  title = 'Danh sách nhóm quyền';
  optionsBtnFilter = {
    icon: 'find',
    type: 'default',
    visible: true,
    onClick: this.onFilter.bind(this)
  }
  dxButtonConfig = dxButtonConfig;
  // addButtonOptions = {
  //   icon: dxButtonConfig.add_icon,
  //   type: dxButtonConfig.add_type,
  //   text: 'Thêm mới',
  //   onClick: () => {
  //       this.add();
  //   }
  // };
  //status
  isShowDetail = true;
  private _focusKey:number = 0;
  set focusKey(value: number){
    // console.log('ischanged');
    this._focusKey = value;
    this.state = 'detail'
    if(this.allData.length>0 && this.allData.findIndex(o=>o.Id==value)!=-1){
      this.currentEntity = clone(this.allData.filter(o=>o.Id == value)[0]);
    } else {
      this.currentEntity = {}
    }
  }
  get focusKey(){
    return this._focusKey;
  }
  state: string = 'detail';
  autoNavigateToFocusedRow = true;
  loading = false;

  //pagination
  pageSize: number = PaginatorConfig.pageSize;
  pageSizes: number[] = PaginatorConfig.allowedPageSizes;
  pageIndex: number = 1;
  totalRows: number = 0;
  
  textSearch: string = '';

  //data
  allData: any[] = [];
  listData: any[] = [];
  currentEntity: any = {};
  user: User = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));

  constructor(
    private roleService: RoleService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
  }

  ngOnInit(): void {
    this.getInitial();
  }
  loadData(){
    this.loading = true;
    this.roleService.selectAllByPermission(this.user.Id,0,0, this.textSearch).subscribe({
      next: (response: ResponseData)=>{
        if(response.Status.Code == 1){
          if(response.Data.length>0){
            this.allData = response.Data;
            this.paging();
            this.focusKey = this.listData[0].Id;
          } else {
            this.listData = [];
            this.focusKey = 0;
            this.currentEntity = {};
            setTimeout(() => {
              if(this.state!='detail'){
                this.detail.validationEntity.instance.reset();
              }
            }, 10);
            this.state = 'detail';
          }
          this.totalRows = response.Pagination.TotalRows;
        } else {
          this.notificationService.showError('Data loading failed!');
          this.totalRows = 0;
        }
        this.loading = false;
      },
      error: _=>{
        this.notificationService.showError('System error!');
        this.totalRows=0;
        this.loading = false;
      }
    });
  }
  getInitial(){
    const paramsFromRouter = this.route.snapshot.queryParamMap;
    let queryParams: any = {};
    if(!paramsFromRouter.get('pageSize')){queryParams.pageSize = this.pageSize.toString()};
    if(!paramsFromRouter.get('pageIndex')){queryParams.pageIndex = this.pageIndex.toString()};
    if(!paramsFromRouter.get('textSearch')){queryParams.textSearch = this.textSearch};
    this.router.navigate(['./administration/systems/roles'], { queryParams, queryParamsHandling: 'merge'}).then(()=>{
      this.getParams();
      this.loadData();
    });
  }
  getParams (){
    const queryParams = this.route.snapshot.queryParamMap;
    const queryPageSize = queryParams.get('pageSize');
    const queryPageIndex = queryParams.get('pageIndex');
    const queryText = queryParams.get('textSearch');

    this.pageSize = queryPageSize && !isNaN(parseInt(queryPageSize, 10)) && PaginatorConfig.allowedPageSizes.includes(parseInt(queryPageSize, 10)) 
      ? parseInt(queryPageSize, 10) 
      : PaginatorConfig.pageSize;
    this.pageIndex = queryPageIndex && parseInt(queryPageIndex, 10) > 0 ? parseInt(queryPageIndex, 10) : 1;
    this.textSearch = queryText && queryText.length > 0 ? queryText : '';
  }
  // pagination
  paging(){
    const fromIndex = this.pageSize*(this.pageIndex-1);
    const toIndex = fromIndex + this.pageSize;
    this.listData = this.allData.slice(fromIndex,toIndex);
  }
  pageChanged(event: any){
    if(this.totalRows>0){
      this.router.navigate(['./administration/systems/roles'], { queryParams: { pageIndex: event.page }, queryParamsHandling: 'merge' })
              .then(() => this.paging());
    }
  }
  pageSizeChanged(event: any) {
    if(this.totalRows>0){
      this.router.navigate(['./administration/systems/roles'], { queryParams: { pageSize: event.pageSize }, queryParamsHandling: 'merge' })
              .then(() => this.paging());
    }
  }
  onFilter(){
    this.router.navigate(['./administration/systems/roles'],{ queryParams:{ textSearch: this.textSearch}, queryParamsHandling: 'merge'})
      .then(()=>this.loadData());
  }
  add(){
    this.detail.entity = {};
    this.state = 'insert';
    this.detail.validationEntity.instance.reset();
  }
  edit(){
    this.state = 'edit';
  }
  cancel(){
    this.detail.entity = clone(this.currentEntity);
    this.state = 'detail';
  }
  save(){
    const check = this.detail.validationEntity.instance.validate();
    if(!check.isValid || this.detail.existName){
      this.notificationService.showError('Invalid input information!');
      return;
    }
    const body = clone(this.detail.entity);
    if(this.state=='insert'){
      this.roleService.insert(body).subscribe({
        next: (response: ResponseData)=>{
          if(response.Status.Code == 1){
            this.notificationService.showSuccess('Role group added successfully!');
            this.detail.entity.Id = response.Data;
            this.listData.unshift(this.detail.entity);
            this.allData.unshift(this.detail.entity);
            this.focusKey = response.Data;
            this.totalRows++;
          } else {
            this.notificationService.showError('Operation failed!');
          }
        },
        error: _=>{
          this.notificationService.showError('System error!');
        }
      })
    } else {
      this.roleService.update(body).subscribe({
        next: (response: ResponseData)=>{
          if(response.Status.Code == 1){
            this.notificationService.showSuccess('Update successful!');
            const index1 = this.listData.findIndex(o=>o.Id== response.Data)
            this.listData[index1]=this.detail.entity;
            const index2 = this.allData.findIndex(o=>o.Id== response.Data)
            this.allData[index2]=this.detail.entity;
            this.state = 'detail';
          } else {
            this.notificationService.showError('Operation failed!');
          }
        },
        error: _=>{
            this.notificationService.showError('System error!');
        }
      })
    }
  }
  delete(id: number,name: string){
    this.notificationService.showConfirmation("Are you sure you want to delete role group '"+name+"'?",()=>{
      this.roleService.delete([id]).subscribe({
        next: (response: ResponseData)=>{
          if(response.Status.Code == 1){
            this.listData = this.listData.filter(o=>o.Id!=id);
            this.allData = this.allData.filter(o=>o.Id!=id);
            this.notificationService.showSuccess("Successfully deleted role group '"+name+"'!");
          } else {
            this.notificationService.showError('Operation failed!');
          }
        },
        error: _=>{
          this.notificationService.showError('System error!')
        }
      })
    })
  }

  toggleDetail(){
    this.isShowDetail = !this.isShowDetail;
  }
  // onFocusedRowChanged(e: any){
  //   this.currentEntity = clone(e.row.data);
  //   console.log(this.currentEntity);
  //   this.state = 'detail'
  // }

}
