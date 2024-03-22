import { Component, OnInit } from '@angular/core';
import { NotificationService, SystemConstants, UserService, fixTimezoneToJSON } from 'src/app/shared';
import { dxButtonConfig } from 'src/app/shared/config';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user: any = {};
  title: string = 'Thông tin người dùng';


  allGender = [{ label: 'Nam', value: true}, { label: 'Nữ', value: false}]
  fullName = '';
  addRess = '';
  birthDay :any = new Date(1980, 1, 1);
  gender :any = true;
  email = '';
  phoneNumber  = '';

  dxButtonConfig = dxButtonConfig;
  constructor(
    private usersService: UserService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.loadDetail();
  }


  loadDetail  () {
    this.usersService.selectOne(this.user.Id)
      .subscribe(
        (res: any) => {
          if (res.Status.Code === 1) {
            const { FullName, Address, BirthDay, Gender, Email, PhoneNumber } = res.Data;
            this.fullName = FullName;
            this.addRess = Address;
            this.birthDay = BirthDay;
          
            if (BirthDay instanceof Date) {
              if (BirthDay.getFullYear() < 1910) this.birthDay = null;
              else { this.birthDay = BirthDay}
            } else {
              let fixBirthDay;
              fixBirthDay = new Date(BirthDay);
              if (fixBirthDay.getFullYear() < 1910) this.birthDay = null;
              else { this.birthDay = BirthDay }
            }
            this.gender = Gender;
            this.email = Email;
            this.phoneNumber = PhoneNumber;
          }
        }
      )
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.usersService.updateCommonInfo({
      Id: this.user.Id,
      FullName: this.fullName,
      Address: this.addRess,
      BirthDay: this.birthDay ? fixTimezoneToJSON(this.birthDay) : fixTimezoneToJSON(new Date(1900, 1, 1)),
      Gender: this.gender,
      Email: this.email,
      PhoneNumber: this.phoneNumber
    })
      .subscribe(
        (res: any) => {
          if (res.Status.Code === 1) {
            this.notificationService.showSuccess('Lưu thông tin thành công');
          }
        }
      )


  }

}
