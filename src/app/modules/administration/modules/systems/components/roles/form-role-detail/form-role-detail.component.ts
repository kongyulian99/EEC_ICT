import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { lastValueFrom } from 'rxjs';
import { clone, RoleService } from 'src/app/shared';

@Component({
  selector: 'app-form-role-detail',
  templateUrl: './form-role-detail.component.html',
  styleUrls: ['./form-role-detail.component.scss']
})
export class FormRoleDetailComponent implements OnInit {

  @ViewChild('validationEntity', {static: false}) validationEntity!: DxValidationGroupComponent;
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
  }
  get state(){
    return this._state;
  }
  readOnly: boolean = true;
  existName = false;

  constructor(
    private roleService: RoleService
  ) { 
    this.validationAsync = this.validationAsync.bind(this);
  }

  ngOnInit(): void {
  }
  async validationAsync(){
    const body = {
      Id: this.entity.Id ? this.entity.Id : 0,
      Name: this.entity.Name
    }
    if(this.state != 'detail'){
      const value$ = this.roleService.checkName(body)
      let value!: any;
      value = await lastValueFrom(value$);
      if(value.Data==1){
        this.existName = false;
      } else {
        this.existName = true;
      }
      return value.Data==1;
    } else {
      this.existName = false;
      return true;
    }
  }

}
