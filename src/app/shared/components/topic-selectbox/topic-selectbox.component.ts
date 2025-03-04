import { Status } from './../../models/responseData';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DMTopicService } from '../../services/dm-topic.service';
import { clone } from '../../utilities';
import { DxTreeViewComponent } from 'devextreme-angular';

@Component({
  selector: 'app-topic-selectbox',
  templateUrl: './topic-selectbox.component.html',
  styleUrls: ['./topic-selectbox.component.scss']
})
export class TopicSelectboxComponent implements OnInit, OnChanges {
  @ViewChild(DxTreeViewComponent, { static: false }) treeView: any;

  @Input() topicId: any;
  @Input() readOnly: any = false;
  @Output() topicIdChange = new EventEmitter();
  items = [];

  isDropdownOpen = false;

  // selectedItem: any;

  constructor(
    private dmTopicService: DMTopicService
  ) {
    this.dmTopicService.selectAll(0, 0, '').subscribe((res:any) => {
      if(res.Status.Code === 1) {
        this.items = res.Data;
      }
    })
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['topicId']) {
      // this.selectedItem = clone(this.topicId);
      this.topicIdChange.emit(this.topicId);
    }
  }

  handleChangeTopic(event) {
    this.topicIdChange.emit(event.value);
  }

  onSelectionChanged(event: any) {
    // debugger;
    if(event.itemData.IdCha > 0) {
      this.topicId = event.itemData.TopicId;
      this.topicIdChange.emit(event.itemData.TopicId);
      this.isDropdownOpen = false;
    }

  }

  onDropDownOpened(isOpened: boolean) {
    if (!isOpened) {
      // Khi dropdown đóng, cập nhật giá trị hiển thị
      // this.selectedItem = [...this.selectedItems];
      // debugger;
    }
  }

  syncTreeViewSelection(e: any) {
    if (!this.treeView) return;

    if (!this.topicId) {
      this.treeView.instance.unselectAll();
    } else {
      this.treeView.instance.selectItem(this.topicId);
    }
  }

  treeView_Changed(e: any) {
    let arr = e.component.getSelectedNodeKeys();
    if (arr.length > 0) {
      this.topicIdChange.emit(e.component.getSelectedNodeKeys()[0]);
    }
  }
}
