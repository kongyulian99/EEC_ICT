import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { NotificationService, UserService } from 'src/app/shared';
import { dxButtonConfig } from 'src/app/shared/config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('validationGroup', {static: false}) validationGroup: DxValidationGroupComponent;
  // @ViewChild('validationEntity', {static: false}) validationEntity!: DxValidationGroupComponent;

  dxButtonConfig = dxButtonConfig;

  item: any = {};
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  isPasswordVisible = false;

  togglePasswordVisibility = () => {
    this.isPasswordVisible = !this.isPasswordVisible;
  };

  signup() {
    if(!this.validationGroup.instance.validate().isValid) {
      this.notificationService.showError("Information invalid!");
      return;
    }
    if(this.item.Password !== this.item.ConfirmPassword) {
      this.notificationService.showError("Password and confirm password do not match!");
      return;
    }
    this.userService.insert(this.item).subscribe((res: any) => {
      if(res.Status.Code === 1) {
        this.notificationService.showSuccess("Succeed!");
        this.router.navigate(['/login'])
      } else {
        this.notificationService.showError(res.Status.Message);
      }
    })
  }
  cancel() {
    this.router.navigate(['/login'])
  }
}
