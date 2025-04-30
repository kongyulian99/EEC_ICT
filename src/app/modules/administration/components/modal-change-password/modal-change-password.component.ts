import { SystemConstants } from './../../../../shared/constants/systems.constant';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { NotificationService, UserService } from 'src/app/shared';
import { ResponseData } from 'src/app/shared/models';

@Component({
  selector: 'app-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss']
})
export class ModalChangePasswordComponent implements OnInit {

  @ViewChild('validationEntity', {static: false}) validationEntity!: DxValidationGroupComponent;
  @Output() changedPassword = new EventEmitter<any>();
  newPassword: string | null = null;
  oldPassword: string | null = null;
  user: any = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  constructor(
    public activeModal: NgbActiveModal,
    private notificationService: NotificationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }
  onPasswordChange(){
    const check = this.validationEntity.instance.validate();
    if(!check.isValid){
      this.notificationService.showError('Information invalid!');
      return;
    }
    this.userService.updatePasword(this.user.UserId, this.newPassword, this.oldPassword).subscribe({
      next: (response:ResponseData) => {
        if(response.Status.Code == 1){
          this.notificationService.showSuccess('Password changed successfully!');
          this.activeModal.close();
        } else {
          this.notificationService.showError(response.Status.Message);
        }
      }
    })
  }
  passwordComparison = () => this.newPassword;
}
