import { ModalChangePasswordComponent } from './../modal-change-password/modal-change-password.component';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenService, NotificationService, SystemConstants } from 'src/app/shared';
import { SignalrService } from 'src/app/shared/services/signalr.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    // @ViewChild(ModalChangePasswordComponent,{static: true}) comptChangePassword!: ModalChangePasswordComponent;
  public pushRightClass: string = '';
  public user: any;

  countThongBaoChiDao = 0;
listThongBaoChuaXem:any = [];

  constructor(
    private authenService: AuthenService,
    public router: Router,
    private modalService: NgbModal,
    private signalRService: SignalrService,
    private notificationService: NotificationService
    ) {
      this.router.events.subscribe((val) => {
          if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
              this.toggleSidebar();
          }
      });
  }

  ngOnInit() {
      this.pushRightClass = 'push-right';
      this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER) as string);
      this.signalRService.connectionEstablished.subscribe();
      this.signalRService.announcementThongBaoChiDao.subscribe((thongbao:any) => {
        console.log(thongbao);
        var listDonViNhan = thongbao.ListDonViNhan;
        var listDonViNhanByUser = listDonViNhan.filter(el => el.MaDonViNhan == this.user.MaDonVi)
        if (listDonViNhanByUser.length > 0) {
            this.listThongBaoChuaXem.push(listDonViNhanByUser[0]);
            this.notificationService.showSuccess('Bạn nhận được thông báo chỉ đạo mới');
        }
      })
        this.signalRService.announcementThongBaoChiDao_DaXem.subscribe(({ IdThongBao, MaDonViNhan }) => {
        let index = this.listThongBaoChuaXem.findIndex(el => el.IdThongBao == IdThongBao && el.MaDonViNhan == MaDonViNhan);
        // if (index > -1) {
        //     this.listThongBaoChuaXem[index].DaNhan = true;
        // }
        this.listThongBaoChuaXem.splice(index, 1);
      })
  }

  isToggled(): boolean {
      const dom: Element | null = document.querySelector('body');
      return dom != null ? dom.classList.contains(this.pushRightClass) : false;
  }

  toggleSidebar() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle('rtl');
  }
  onChangePassword(){
   const modalRef =this.modalService.open(ModalChangePasswordComponent,{backdrop: 'static', animation: false, });
//    console.log(modalRef.componentInstance.whoAmI());
  }

  onLoggedout() {
    this.authenService.logout()
      .subscribe(
          (response: any) => {
              if (response.Status.Code === 1) {
                  localStorage.removeItem(SystemConstants.CURRENT_USER);
              }
          }
      );
  }

  @Output() onToggle = new EventEmitter();
  toggleCollapseSidebar() {
    this.onToggle.emit();
  }
}
