import { DxValidationGroupComponent } from 'devextreme-angular';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { clone, CommandService, FunctionService, NotificationService } from 'src/app/shared';
import { CommandAssign, ResponseData } from 'src/app/shared/models';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-function-detail',
  templateUrl: './form-function-detail.component.html',
  styleUrls: ['./form-function-detail.component.scss']
})
export class FormFunctionDetailComponent implements OnInit {

  @ViewChild('validationEntity', {static: false}) validationEntity!: DxValidationGroupComponent;
  private _entity: any = {};
  @Input() set entity(value){
    if(value){
      this._entity = clone(value);
      // console.log(this._entity);
    }
  }
  get entity(){
    return this._entity;
  }
  @Input() listData: any[]=[];
  @Input() ListParentFunction: any[]=[];
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
        { Index: 1, Text: 'Hành động'},
      ]

    }
  }
  get state(){
    return this._state;
  }
  types: any[] = [
    { Index: 0, Text: 'Thông tin'},
    { Index: 1, Text: 'Hành động'},
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
  existFunctionId = false;

  @Output('onRemoveCommand') onRemoveCommand = new EventEmitter<any>();  // output
  @Output('onAddCommand') onAddCommand = new EventEmitter<any>();
  @Input() listCommands!: any[];
  existingCommands: any[] = [];
  selectedCommands: any[] = [];

  private _popupVisible = false;
  set popupVisible(value: boolean){
    this._popupVisible = value;
    if(!value){
      this.selectedCommands = [];
      this.isAddToAllFunctions = false;
    }
  }
  get popupVisible(){
    return this._popupVisible;
  }
  addRoleButtonOptions: any;
  closeRoleButtonOptions: any;
  isAddToAllFunctions: boolean = false;

  constructor(
    private functionService: FunctionService,
    private commandService: CommandService,
    private notificationService: NotificationService
  ) { 
    this.validationAsync = this.validationAsync.bind(this);
    const that = this;
    this.addRoleButtonOptions = {
      icon: 'check',
      text: 'Thêm',
      type: 'default',
      onClick(e:any) {
        const commandIds = that.selectedCommands.map(x=>x.Id);
        const commandAssign: CommandAssign = {
          commandIds,
          addToAllFunctions: that.isAddToAllFunctions 
        }
        that.commandService.addCommandToFunction(that.entity.Id,commandAssign).subscribe({
          next: (response: ResponseData)=>{
            if(response.Status.Code == 1){
              that.notificationService.showSuccess(`Thêm thành công ${commandAssign.commandIds.length} hành động!`);
              that.onAddCommand.emit({ListCommands: that.selectedCommands});
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
  }

  ngOnInit(): void {
  }
  async validationAsync(){
    // let check = true;
    // if(this.state=='insert'){
    //   for(let i = 0; i< this.listData.length; i++){
    //     if(this.listData[i].UserName === e.value){
    //       check = false;
    //       break;
    //     }
    //   }
    // }
    // return check;
    const body = {
      Id: this.entity.Id ? this.entity.Id : '0',
    }
    if(this.state == 'insert'){
      const value$ = this.functionService.checkFunctionId(body)
      let value!: any;
      // try{
        value = await lastValueFrom(value$);
        if(value.Data==1){
          this.existFunctionId = false;
        } else {
          this.existFunctionId = true;
        }
        return value.Data==1;
      // } catch(error:any){
      //   return false;
      // }

    } else {
      this.existFunctionId = false;
      return true;
    }

    // return !this.existUserName;
  }
  passwordComparison = () => this.entity.Password;
  
  // Command 
  removeCommands(id: number) {
    this.notificationService.showConfirmation('Bạn chắc chắn muốn xóa quyền này?',
      () => this.deleteCommandsConfirm(id));
  }

  deleteCommandsConfirm(id: number) {
    this.commandService.removeCommandInFunction(this.entity.Id, [id]).subscribe({
      next: (response: any) => {
        if (response.Status.Code == 1) {
          this.listCommands = this.listCommands.filter(o=>o.Id != id);
          this.onRemoveCommand.emit({Id: id});
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
