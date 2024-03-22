import { Component, DebugEventListener, OnInit } from '@angular/core';
import { FunctionService, NotificationService, PermissionService, RoleService, SystemConstants, User } from 'src/app/shared';
import { dxButtonConfig } from 'src/app/shared/config';
import { Permission, PermissionScreen, PermissionUpdateRequest, ResponseData } from 'src/app/shared/models';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  title: string = 'Phân quyền người dùng';
  dxButtonConfig = dxButtonConfig;
  public functions: PermissionScreen[];
  public roles: any[] = [];
  private _roleIds: number[] = [];
  set roleIds(value: number[]) {
    this._roleIds=value;
    if(this.roleIds && this.roleIds.length>0){
      this.roleId = this.roleIds[0];
    }
  } 
  get roleIds(){
    return this._roleIds;
  }
  private _roleId!: number;
  set roleId(value: number){
    this._roleId = value;
    // console.log(value);
    if(typeof value == 'number'){
      this.loadData(value);
    }
  }
  get roleId(){
    return this._roleId;
  }
  // public commands: any[] = [];
  loading: boolean = false;
  private _loadingDetail: boolean = false;
  set loadingDetail(value: boolean){
    this._loadingDetail = value;
  }
  get loadingDetail(){
    return this._loadingDetail;
  }
  isChanging: boolean = false;
  user: User = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));

  constructor(

    private permissionService: PermissionService,
    private roleService: RoleService,
    private functionService: FunctionService,
    private notificationService: NotificationService
  ) {
  }


  ngOnInit() {
    this.loadAllRoles();
  }
  loadAllRoles() {
    this.loading = true;
    this.roleService.selectAllByPermission(this.user.Id,0, 0, '')
      .subscribe({
        next: (response: ResponseData) => {
          if (response.Status.Code === 1) {
            this.roles = response.Data;
          }
          this.loading = false;
        }, 
        error: _=> {
          this.loading = false;
        }
    });
  }
  findIndex(id: string): number{
    const index = this.functions.findIndex(o=>o.Id == id);
    // console.log(this.functions[index]);
    return index;
  }
  loadData(roleId) {
    if (roleId != null) {
      this.loadingDetail = true;
      this.functionService.getFunctionWithCommandsAndPermission(roleId)
        .subscribe({
          next: (response: ResponseData) => {
            if(response.Status.Code == 1){
              this.functions = response.Data;
              // console.log(this.functions);
              // this.fillPermissions(roleId);
            } else {
              this.notificationService.showError('Tải dữ liệu không thành công!');
            }
            this.loadingDetail = false;
          }, 
          error: _=> {
            this.loadingDetail = false;
          }
        });
    }

  }
  savePermission(){
    this.loading = true;
    const listPermissions: Permission[] = [];
    this.functions.forEach(element => {
      if(element.ValueCreate){
        listPermissions.push({
          FunctionId: element.Id,
          RoleId: this.roleId,
          CommandId: SystemConstants.CREATE_ACTION
        });
      }
      if(element.ValueUpdate){
        listPermissions.push({
          FunctionId: element.Id,
          RoleId: this.roleId,
          CommandId: SystemConstants.UPDATE_ACTION
        });
      }
      if(element.ValueDelete){
        listPermissions.push({
          FunctionId: element.Id,
          RoleId: this.roleId,
          CommandId: SystemConstants.DELETE_ACTION
        });
      }
      if(element.ValueView){
        listPermissions.push({
          FunctionId: element.Id,
          RoleId: this.roleId,
          CommandId: SystemConstants.VIEW_ACTION
        });
      }
      if(element.ValueDownload){
        listPermissions.push({
          FunctionId: element.Id,
          RoleId: this.roleId,
          CommandId: SystemConstants.DOWNLOAD_ACTION
        });
      }
      if(element.ValueUpload){
        listPermissions.push({
          FunctionId: element.Id,
          RoleId: this.roleId,
          CommandId: SystemConstants.UPLOAD_ACTION
        });
      }

      if(element.ValueApprove){
        listPermissions.push({
          FunctionId: element.Id,
          RoleId: this.roleId,
          CommandId: SystemConstants.APPROVE_ACTION
        });
      }
    });
    const permissionsUpdateRequest = new PermissionUpdateRequest();
    permissionsUpdateRequest.Permissions = listPermissions;
    this.permissionService.save(this.roleId, permissionsUpdateRequest)
      .subscribe({
        next: (response: any) => {
          if (response.Status.Code==1) {
            this.notificationService.showSuccess('Lưu thành công!');
          } else {
            this.notificationService.showError('Không thành công!');
            this.loadData(this.roleId);
          }
          this.loading = false;
        }, 
        error: _=> {
          this.notificationService.showError('Không thành công!');
          this.loading = false;
          this.loadData(this.roleId);
        }
    });

  }

  changeParentLogic (event, Id, prop) {
    if (event.value) {
      this.functions.filter(x => x.ParentId == Id)
      .forEach(el => {
        el[prop] = true;
      })
    }
    
  }
}
