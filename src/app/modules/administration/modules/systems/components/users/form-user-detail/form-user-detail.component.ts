import { DxValidationGroupComponent } from 'devextreme-angular';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { clone } from 'src/app/shared/utilities';
import { NotificationService, SystemConstants, UserService } from 'src/app/shared';
import { ResponseData } from 'src/app/shared/models';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-user-detail',
  templateUrl: './form-user-detail.component.html',
  styleUrls: ['./form-user-detail.component.scss']
})
export class FormUserDetailComponent implements OnInit {

  @ViewChild('validationEntity', {static: false}) validationEntity!: DxValidationGroupComponent;
  itemsGender: any[] = [
    {value: true, text: 'Nam'},
    {value: false, text: 'Nữ'}
  ]
  @Input() ListDonVi: any[] = [];
  private _entity: any = {};
  @Input() set entity(value){
    if(value){
      this._entity = clone(value);
    }
  }
  get entity(){
    return this._entity;
  }
  @Input() listData: any[]=[];
  private _state = 'detail';
  @Input() set state(value){
    this._state = value;
    this.readOnly = value == 'detail';
    if(value!='detail'){
      this.types = [
        { Index: 0, Text: 'Thông tin'},
      ]
    } else {
      this.types = [
        { Index: 0, Text: 'Thông tin'},
        { Index: 1, Text: 'Nhóm quyền'},
        { Index: 2, Text: 'Chuyên ngành'},
      ]

    }
  }
  get state(){
    return this._state;
  }
  types: any[] = [
    { Index: 0, Text: 'Thông tin'},
    { Index: 1, Text: 'Nhóm quyền'},
  ]

  @Output('indexTabChange') indexTabChange = new EventEmitter<any>();  // output
  private _indexTab: number = 0;
  @Input() set indexTab(value: number){
    this._indexTab= value;
    this.indexTabChange.emit(value);
  }
  get indexTab(){
    return this._indexTab;
  }

  readOnly: boolean = true;
  existUserName = false;

  @Output('onRemoveRole') onRemoveRole = new EventEmitter<any>();  // output
  @Output('onAddRole') onAddRole = new EventEmitter<any>();
  @Input() listRoles!: any[];
  existingRoles: any[] = [];
  selectedRoles: any[] = [];
  private _popupVisible = false;
  set popupVisible(value: boolean){
    this._popupVisible = value;
    if(!value){
      this.selectedRoles = [];
    }
  }
  get popupVisible(){
    return this._popupVisible;
  }

  @Output('onRemoveChuyenNganh') onRemoveChuyenNganh = new EventEmitter<any>();  // output
  @Output('onAddChuyenNganh') onAddChuyenNganh = new EventEmitter<any>();
  existingChuyenNganh: any[] = [];
  selectedChuyenNganh: any[] = [];
  private _popupChuyenNganhVisible = false;
  set popupChuyenNganhVisible(value: boolean){
    this._popupChuyenNganhVisible = value;
    if(!value){
      this.selectedChuyenNganh = [];
    }
  }
  get popupChuyenNganhVisible(){
    return this._popupChuyenNganhVisible;
  }

  addRoleButtonOptions: any;
  closeRoleButtonOptions: any;
  addChuyenNganhButtonOptions: any;
  closeChuyenNganhButtonOptions: any;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.validationAsync = this.validationAsync.bind(this);
    const that = this;
    this.addRoleButtonOptions = {
      icon: 'check',
      text: 'Thêm',
      type: 'default',
      onClick(e:any) {
        const roleIds = that.selectedRoles.map(x=>x.Id);
        that.userService.addRoles(that.entity.Id,roleIds).subscribe({
          next: (response: ResponseData)=>{
            if(response.Status.Code == 1){
              that.notificationService.showSuccess(`Thêm thành công ${roleIds.length} quyền!`);
              // that.listRoles.push(...that.selectedRoles);
              that.onAddRole.emit({ListRoles: that.selectedRoles});
              // debugger;
              that.popupVisible = false;
            } else {
              that.notificationService.showError('Không thành công!');
            }
          },
          error: _=>{
            that.notificationService.showError('Lỗi hệ thống');
          }
        })
      },
    };
    this.closeRoleButtonOptions = {
      text: 'Đóng',
      onClick(e:any) {
        that.popupVisible = false;
      },
    };

    this.addChuyenNganhButtonOptions = {
      icon: 'check',
      text: 'Thêm',
      type: 'default',
      onClick(e:any) {
        const idChuyenNganhs = that.selectedChuyenNganh.map(x=>x.IdChuyenNganh);
        // debugger;
        that.userService.addChuyenNganh(that.entity.Id, idChuyenNganhs).subscribe({
          next: (response: ResponseData)=>{
            if(response.Status.Code == 1){
              that.notificationService.showSuccess(`Thêm thành công ${idChuyenNganhs.length} chuyên ngành!`);
              // debugger;
              that.onAddChuyenNganh.emit({ListChuyenNganh: that.selectedChuyenNganh});
              that.popupChuyenNganhVisible = false;
            } else {
              that.notificationService.showError('Không thành công!');
            }
          },
          error: _=>{
            that.notificationService.showError('Lỗi hệ thống');
          }
        })
      },
    };
    this.closeChuyenNganhButtonOptions = {
      text: 'Đóng',
      onClick(e:any) {
        that.popupChuyenNganhVisible = false;
      },
    };
  }

  ngOnInit(): void {
  }

  async validationAsync(){
    const body = {
      Id: this.entity.Id ? this.entity.Id : '0',
      UserName: this.entity.UserName
    }
    if(this.state != 'detail'){
      const value$ = this.userService.checkUserName(body)
      let value!: any;
      // try{
        value = await lastValueFrom(value$);
        if(value.Data==1){
          this.existUserName = false;
        } else {
          this.existUserName = true;
        }
        return value.Data==1;
      // } catch(error:any){
      //   return false;
      // }

    } else {
      this.existUserName = false;
      return true;
    }

    // return !this.existUserName;
  }
  passwordComparison = () => this.entity.Password;

  // Role
  removeRoles(id: number) {
    this.notificationService.showConfirmation('Bạn chắc chắn muốn xóa quyền này?',
      () => this.deleteRolesConfirm(id));
  }

  deleteRolesConfirm(id: number) {
    this.userService.removeRoles(this.entity.Id, [id]).subscribe({
      next: (response: any) => {
        if (response.Status.Code == 1) {
          this.listRoles = this.listRoles.filter(o=>o.Id != id);
          this.onRemoveRole.emit({Id: id});
          this.notificationService.showSuccess('Xóa thành công');
        } else {
        }
      },
      error: () => {
        this.notificationService.showError('Không thành công!');
      }
    });
  }
}
