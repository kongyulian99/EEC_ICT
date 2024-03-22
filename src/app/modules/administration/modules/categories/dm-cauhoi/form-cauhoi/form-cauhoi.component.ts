import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NotificationService, clone } from 'src/app/shared';
import { DMCauhoiService } from 'src/app/shared/services/dm-cauhoi.service';
import { DMTopicService } from 'src/app/shared/services/dm-topic.service';
@Component({
  selector: 'app-form-cauhoi',
  templateUrl: './form-cauhoi.component.html',
  styleUrls: ['./form-cauhoi.component.scss'],
})
export class FormCauhoiComponent implements OnInit {
  @ViewChild('validationEntity', { static: false }) validationEntity: any;

  private _entity: any = {};
  @Input() set entity(value) {
    if (value) {
      this._entity = clone(value);
    }
  }
  get entity() {
    return this._entity;
  }
  @Input() listData: any[] = [];
  private _state = 'detail';
  @Input() set state(value) {
    this._state = value;
    this.readOnly = value == 'detail';
  }
  get state() {
    return this._state;
  }
  readOnly: boolean = true;

  constructor(
    private service: DMCauhoiService,
    private dMTopicService: DMTopicService,
    private notificationService: NotificationService
  ) {
    this.validationAsync = this.validationAsync.bind(this);
  }

  ngOnInit(): void {}

  async validationAsync(){
    if(this.state == 'insert') {
      const value$ = this.service.checkDuplicate(this.entity.MaCauhoi)
      let value!: any;
      value = await lastValueFrom(value$);
      return value.Data==1;
    } else {
      return true;
    }
  }

  tempAnswerId = 0;
  handleAddChoice() {
    if(!this.entity.ChoiceList) this.entity.ChoiceList = [];
    this.entity.ChoiceList.push({TempAnswerId: this.tempAnswerId++});
  }

  handleDeleteChoice(it) {
    // debugger;
    this.notificationService.showConfirmation("Chắc chắn xoá?", () => {
      if(it.AnswerId > 0) {
        this.entity.ChoiceList = this.entity.ChoiceList.filter(o => o.AnswerId != it.AnswerId);
        if (this.entity.ChoiceList_Delete) {
          this.entity.ChoiceList_Delete.push(it);
        } else {
          this.entity.ChoiceList_Delete = [it];
        }
      } else {
        this.entity.ChoiceList = this.entity.ChoiceList.filter(o => o.TempAnswerId != it.TempAnswerId);
      }
    })
  }
}
