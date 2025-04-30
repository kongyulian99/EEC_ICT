import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationStatus } from 'devextreme/common';
import { clone, NotificationService, RoleService, SystemConstants, User, UserService } from 'src/app/shared';
import { dxButtonConfig, PaginatorConfig } from 'src/app/shared/config';
import { ResponseData } from 'src/app/shared/models';
import { FormUserDetailComponent } from './form-user-detail/form-user-detail.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('detail', {static: false}) detail!: FormUserDetailComponent;
  placeholderSearch = 'Nhập tên hoặc username...';
  title = 'Danh sách người dùng'
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
  private _focusKey:string = '';
  set focusKey(value: string){
    this._focusKey = value;
    if(this.listData.length>0 && this.listData.findIndex(o=>o.Id==value)!=-1){
      // debugger;
      this.loadRole(value);
      this.currentEntity = clone(this.listData.filter(o=>o.Id == value)[0]);
    }
    // console.log(this.currentEntity);
    this.state = 'detail'
  }
  get focusKey(){
    return this._focusKey;
  }
  state: string = 'detail';
  autoNavigateToFocusedRow = true;
  loading = false;
  indexTab: number = 0;

  //pagination
  pageSize: number = PaginatorConfig.pageSize;
  pageSizes: number[] = PaginatorConfig.allowedPageSizes;
  pageIndex: number = 1;
  totalRows: number = 0;

  textSearch: string = '';
  filterMaDonVi = '';
  filterRole = 0;

  //data
  listData: any[] = [];
  currentEntity: any = {};
  listDonVi: any[] = [];
  listRoles: any[] = [];
  allRoles: any[] = [];
  allRolesAddTatCa = [];

  positionOf!: string;
  user: User = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));


  constructor(
    private userService: UserService,
    // private dmDonViService: DMDonViService,
    private rolesService: RoleService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // this.dmDonViService.selectAllCap2().subscribe({
    //   next: (response: ResponseData)=>{
    //     if(response.Status.Code == 1){
    //       this.listDonVi = [{MaDonVi: '0', TenDonVi:'--Khác--'},...response.Data];
    //     }
    //   },
    //   error:(e: any)=>{
    //     // console.log(e);
    //     this.notificationService.showError('Lỗi hệ thống!');
    //   }
    // })
    this.rolesService.selectAll(0, 0, '').subscribe({
      next: (response: ResponseData) => {
        if (response.Status.Code = 1) {
          this.allRoles = response.Data;
          this.allRolesAddTatCa = [{ Id: 0, Name: 'Tất cả' }, ...this.allRoles];
        } else {
        }
      },
      error: () => {
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadRole(userId: string){
    this.userService.getRoles(userId).subscribe({
      next: (response: ResponseData)=>{
        if(response.Status.Code == 1){
          this.listRoles = [...response.Data];
          this.getExistRoles();
        }
      },
      error:(e: any)=>{
        // console.log(e);
        this.notificationService.showError('Lỗi hệ thống!');
      }
    })
  }

  getExistRoles(){
    // debugger;
    this.detail.existingRoles = this.allRoles.filter((item)=>{
      return this.listRoles.map(x => x.Id).indexOf(item.Id) === -1;
    });
  }

  loadData(){
    this.loading = true;
    const queryParams = this.route.snapshot.queryParamMap;
    const queryPageSize = queryParams.get('pageSize');
    const queryPageIndex = queryParams.get('pageIndex');
    const queryText = queryParams.get('textSearch');
    const queryMaDonVi = queryParams.get('maDonVi');
    const queryRole = queryParams.get('role');

    this.pageSize = queryPageSize && !isNaN(parseInt(queryPageSize, 10)) && PaginatorConfig.allowedPageSizes.includes(parseInt(queryPageSize, 10))
      ? parseInt(queryPageSize, 10)
      : PaginatorConfig.pageSize;
    this.pageIndex = queryPageIndex && parseInt(queryPageIndex, 10) > 0 ? parseInt(queryPageIndex, 10) : 1;

    this.filterRole = queryRole && parseInt(queryRole, 10) > 0 ? parseInt(queryRole, 10) : 0;
    this.filterMaDonVi = queryMaDonVi && queryMaDonVi.length > 0 ? queryMaDonVi : '';
    this.textSearch = queryText && queryText.length > 0 ? queryText : '';


    this.userService.selectByDonViAndNhom(this.filterMaDonVi, this.filterRole, this.textSearch, this.pageIndex, this.pageSize).subscribe({
      next: (response: ResponseData)=>{
        if(response.Status.Code == 1){
          if(response.Data.length>0){
            // this.allData = response.Data;
            // this.allData = []
            this.listData = response.Data;
            if(this.listData.length>0){
              this.focusKey = this.listData[0].Id;
            }
          } else {
            this.listData = [];
            this.focusKey = '';
            this.currentEntity = {};
            // setTimeout(() => {
            //   this.detail.validationEntity.instance.reset();
            // }, 10);
            this.state = 'detail';
          }
          this.totalRows = response.Pagination.TotalRows;
        } else {
          this.notificationService.showError('Dữ liệu tải lỗi!');
          this.totalRows = 0;
        }
        this.loading = false;
      },
      error: ()=>{
        this.notificationService.showError('Lỗi hệ thống!');
        this.totalRows=0;
        this.loading = false;
      }
    });
  }


  onTabChanged(e: any){
    this.indexTab = e.value;
  }
  // pagination

  pageChanged(event: any){
    if(this.totalRows>0){
      this.router.navigate(['/administration/systems/users'], { queryParams: { pageIndex: event.page }, queryParamsHandling: 'merge' })
              .then(() => this.loadData());
    }
  }
  pageSizeChanged(event: any) {
    if(this.totalRows>0){
      this.router.navigate(['/administration/systems/users'], { queryParams: { pageSize: event.pageSize, pageIndex: 1 }, queryParamsHandling: 'merge' })
              .then(() => this.loadData());
    }
  }

  handleChangeMaDonVi(){
    this.router.navigate(['/administration/systems/users'],{ queryParams:{ maDonVi: this.filterMaDonVi, pageIndex: 1}, queryParamsHandling: 'merge'})
      .then(()=>this.loadData());
  }

  handleChangeFilterRole(){
    this.router.navigate(['/administration/systems/users'],{ queryParams:{ role: this.filterRole, pageIndex: 1}, queryParamsHandling: 'merge'})
      .then(()=>this.loadData());
  }

  onFilter(){
    this.router.navigate(['/administration/systems/users'],{ queryParams:{ textSearch: this.textSearch, pageIndex: 1}, queryParamsHandling: 'merge'})
      .then(()=>this.loadData());
  }
  add(){
    this.indexTab = 0;
    this.detail.entity = { Gender: true, Status: true, MaDonVi: '0' };
    this.state = 'insert';
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
    if(!check.isValid || this.detail.existUserName){
      this.notificationService.showError('Thông tin nhập không hợp lệ!');
      return;
    }
    const body = clone(this.detail.entity);

    body.MaDonVi=body.MaDonVi=='0'?null:body.MaDonVi;
    if(this.state=='insert'){
      this.userService.insert(body).subscribe({
        next: (response: ResponseData)=>{
        if(response.Status.Code == 1){
          this.notificationService.showSuccess('Thêm mới thành công!');
          this.detail.entity.Id = response.Data;
          this.listData.unshift(this.detail.entity);
          this.state = 'detail';
          this.focusKey = response.Data;
          this.totalRows++;
        } else {
          this.notificationService.showError('Không thành công!');
        }
        },
        error: _=>{
            this.notificationService.showError('Lỗi hệ thống!');
        }
      })
    } else {
      this.userService.update(body).subscribe({
        next:(response: ResponseData)=>{
          if(response.Status.Code == 1){
            this.notificationService.showSuccess('Cập nhật thành công!');
            const index1 = this.listData.findIndex(o=>o.Id == response.Data)
            this.listData[index1]=this.detail.entity;
            this.state = 'detail';
          } else {
            this.notificationService.showError('Không thành công!');
          }
        },
        error: _=>{
          this.notificationService.showError('Lỗi hệ thống!')
        }
      })
    }
  }
  delete(id: any,name: string){
    this.notificationService.showConfirmation("Are you sure you want to delete '"+name+"'?",()=>{
      this.userService.delete(id).subscribe({
        next: (response: ResponseData)=>{
          if(response.Status.Code == 1){
            this.listData = this.listData.filter(o=>o.Id!=id);
            this.focusKey = this.listData.length>0 ? this.listData[0].Id : this.focusKey;
            this.notificationService.showSuccess("Successfully deleted '"+name+"'!");
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

  showAddRole(){
    this.detail.popupVisible = true;
  }
  addRole(e:any){
    this.listRoles.push(...e.ListRoles);
    this.getExistRoles();
  }
  removeRole(e: any){
    this.listRoles = this.listRoles.filter(o=>o.Id !== e.Id);
    this.getExistRoles();
  }

  toggleDetail(){
    this.isShowDetail = !this.isShowDetail;
  }

  resetPassword (userId) {
    this.notificationService.showConfirmation("Bạn có chắc chắn muốn reset mật khẩu user này? Mật khẩu mới là 'Admin@123'",()=>{
      this.userService.resetPasword(userId)
        .subscribe({
          next: (res: any) => {
            if (res.Status.Code === 1) {
              this.notificationService.showSuccess('Reset password thành công');
            }
          }
        })
    })
  }
}
