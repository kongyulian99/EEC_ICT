import { Status } from './../../models/responseData';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DMTopicService } from '../../services/dm-topic.service';

@Component({
  selector: 'app-topic-selectbox',
  templateUrl: './topic-selectbox.component.html',
  styleUrls: ['./topic-selectbox.component.scss']
})
export class TopicSelectboxComponent implements OnInit {
  @Input() topicId: any;
  @Input() readOnly: any = false;
  @Output() topicIdChange = new EventEmitter();
  items = [];
  constructor(
    private dmTopicService: DMTopicService
  ) { }

  ngOnInit(): void {
    this.dmTopicService.selectAll(0, 0, '').subscribe((res:any) => {
      if(res.Status.Code === 1) {
        this.items = res.Data;
      }
    })
  }

  handleChangeTopic(event) {
    this.topicIdChange.emit(event.value);
  }

}
