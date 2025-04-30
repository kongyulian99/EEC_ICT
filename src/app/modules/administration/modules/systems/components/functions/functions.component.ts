import { FormFunctionDetailComponent } from './form-function-detail/form-function-detail.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { dxButtonConfig, PaginatorConfig } from 'src/app/shared/config';
import { clone, CommandService, FunctionService, NotificationService } from 'src/app/shared';
import { ResponseData } from 'src/app/shared/models';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss']
})
export class FunctionsComponent implements OnInit {
  @ViewChild('detail', {static: false}) detail!: FormFunctionDetailComponent;
  placeholderSearch = 'Nhập tên chức năng...';
  title = 'Danh sách chức năng'
  // optionsBtnFilter = {
  //   icon: 'find',
  //   type: 'default',
  //   visible: true,
  //   onClick: this.onFilter.bind(this)
  // }
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
    if(this.allData.length>0 && this.allData.findIndex(o=>o.Id==value)!=-1){
      this.loadCommand(value);
      this.currentEntity = clone(this.allData.filter(o=>o.Id == value)[0]);
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

  
  textSearch: string = '';

  //data
  private _allData: any[] = [];
  set allData(value: any[]){
    this._allData = value;
    if(value.length>0){
      this.listParent = [{Id: '0', Name: '----'},...value.filter(o=>o.ParentId=='0')];
      // console.log(this.listParent);
      // console.log(value);
    }
  }
  get allData(){
    return this._allData;
  }

  currentEntity: any = {};
  listParent: any[] = [];
  listCommands: any[] = [];
  allCommands: any[] = [];

  positionOf!: string;


  constructor(
    private functionService: FunctionService,
    private commandService: CommandService,
    // private rolesService: RoleService,
    private notificationService: NotificationService,
  ) { 
    this.commandService.selectAll().subscribe({
      next: (response: ResponseData) => {
      if (response.Status.Code = 1) {
        this.allCommands = response.Data;
        // this.loadRole();
      } else {
      }
      }, 
      error:() => {
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }
  getExistCommands(){
    this.detail.existingCommands = this.allCommands.filter((item)=>{
      return this.listCommands.map(x => x.Id).indexOf(item.Id) === -1;
    });
  }
  loadCommand(functionId: string){
    this.commandService.selectByFunctionId(functionId).subscribe({
      next: (response: ResponseData)=>{
        if(response.Status.Code == 1){
          this.listCommands = [...response.Data];
          this.getExistCommands();
        }
      },
      error:(e: any)=>{
        // console.log(e);
        this.notificationService.showError('System error!');
      }
    })

  }
  loadData(){
    this.loading = true;
    this.functionService.selectAll().subscribe({
      next: (response: ResponseData)=>{
        if(response.Status.Code == 1){
          if(response.Data.length>0){
            let data: any[] = response.Data;
            this.allData = clone(data);
            // this.allData = []
            if(this.allData.length>0){
              this.focusKey = this.allData[0].Id;
              // console.log(this.allData);
              // console.log(this.focusKey);
            }
          } else {
            this.allData = [];
            this.focusKey = '';
            this.currentEntity = {};
            setTimeout(() => {
              this.detail.validationEntity.instance.reset();
            }, 10);
            this.state = 'detail';
          }
        } else {
          this.notificationService.showError('Data loading failed!');
        }
        this.loading = false;
      },
      error: ()=>{
        this.notificationService.showError('System error!');
        this.loading = false;
      }
    });
  }
  onTabChanged(e: any){
    this.indexTab = e.value;
  }
  add(){
    this.indexTab = 0;
    this.detail.entity = { Status: true, ParentId: '0' };
    this.state = 'insert';
    // this.detail.validationEntity.instance.reset();
    // console.log(this.detail.entity);
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
    if(!check.isValid || this.detail.existFunctionId){
      this.notificationService.showError('Invalid input information!');
      return;
    }
    const body = clone(this.detail.entity);
    body.ParentId = body.ParentId == '0' ? null : body.ParentId;
    // body.Id=body.MaDonVi=='0'?null:body.MaDonVi;
    if(this.state=='insert'){
      this.functionService.insert(body).subscribe({
        next: (response: ResponseData)=>{
        if(response.Status.Code == 1){
          this.notificationService.showSuccess('Successfully added new!');
          // this.detail.entity.Id = response.Data;
          let data: any[] = clone(this.allData)
          data.push(this.detail.entity);
          data.sort((a,b)=>{return a.SortOrder-b.SortOrder})
          this.allData = clone(data);
          this.state = 'detail';
          // setTimeout(() => {
          //   this.detail.entity = {};
          //   this.state = 'insert';
          //   this.detail.validationEntity.instance.reset();
          // }, 100);
          this.focusKey = response.Data;
        } else {
          this.notificationService.showError('Operation failed!');
        }
        },
        error: _=>{
            this.notificationService.showError('System error!');
        }
      })
    } else {
      this.functionService.update(body).subscribe({
        next:(response: ResponseData)=>{
          if(response.Status.Code == 1){
            this.notificationService.showSuccess('Successfully updated!');
            const index = this.allData.findIndex(o=>o.Id== response.Data);
            let data: any[] = clone(this.allData);
            data[index]=this.detail.entity;
            data.sort((a,b)=>{return a.SortOrder-b.SortOrder});
            this.allData = clone(data);
            this.state = 'detail';
          } else {
            this.notificationService.showError('Operation failed!');
          }
        },
        error: _=>{
          this.notificationService.showError('System error!')
        }
      })
    }
  }
  // getDataTree(list: any[]){
  // }
  delete(id: string,name: string){
    this.notificationService.showConfirmation("Are you sure you want to delete '"+name+"'?",()=>{
      this.functionService.delete([id]).subscribe({
        next: (response: ResponseData)=>{
          if(response.Status.Code == 1){
            this.allData = this.allData.filter(o=>o.Id!=id);
            this.focusKey = this.allData.length>0 ? this.allData[0].Id : this.focusKey;
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

  showAddCommand(){
    this.detail.popupVisible = true;
  }
  addCommand(e:any){
    this.listCommands.push(...e.ListCommands);
    this.getExistCommands();
  }
  removeCommand(e: any){
    this.listCommands = this.listCommands.filter(o=>o.Id !== e.Id);
    this.getExistCommands();
  }

  toggleDetail(){
    this.isShowDetail = !this.isShowDetail;
  }
  // onFocusedRowChanged(e: any){
  //   this.loadCommand(e.row.data.Id);
  //   this.currentEntity = clone(e.row.data);
  //   // console.log(this.currentEntity);
  //   this.state = 'detail'
  // }
}
