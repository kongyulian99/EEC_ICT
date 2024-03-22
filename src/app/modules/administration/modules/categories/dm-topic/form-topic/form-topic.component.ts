import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { clone } from 'src/app/shared';
import { DMTopicService } from 'src/app/shared/services/dm-topic.service';
@Component({
  selector: 'app-form-topic',
  templateUrl: './form-topic.component.html',
  styleUrls: ['./form-topic.component.scss'],
})
export class FormTopicComponent implements OnInit {
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
    private service: DMTopicService
  ) {
    this.validationAsync = this.validationAsync.bind(this);
  }

  ngOnInit(): void {}

  async validationAsync(){
    if(this.state == 'insert') {
      const value$ = this.service.checkDuplicate(this.entity.MaTopic)
      let value!: any;
      value = await lastValueFrom(value$);
      return value.Data==1;
    } else {
      return true;
    }
  }
}
