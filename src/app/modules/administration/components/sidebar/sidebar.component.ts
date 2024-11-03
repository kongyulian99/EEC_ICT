import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { SystemConstants, clone } from 'src/app/shared';
// import { sideBarInfo } from '../../../../shared/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isActive: boolean = false;
  @Input() collapsed: boolean = false;
  showMenu: string = '';
  pushRightClass: string = '';
  functions: any[] = [];
  sideBarInfo: any = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER) as string).Functions;
  user: any = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER) as string);
  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(public router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
      if (val instanceof NavigationEnd && this.functions.length > 0) {
        this.checkActiveParent();
      }
    });
  }

  // sidebar functions
  sysFunctions: any[] = [
    {
      IsActive: true, Id: 1, IconCss: 'fa-cog', Name: 'System', Children: [
        {IsActive: true, Id: 2, IconCss: 'fa-caret-light', Name: 'System'},
        {IsActive: true, Id: 3, IconCss: 'fa-caret-light', Name: 'System'},
      ]
    },
    {
      IsActive: true, Id: 4, IconCss: 'fa-bars', Name: 'Categories', Children: [
        {IsActive: true, Id: 5, IconCss: 'fa-caret-light', Name: 'Topic', Url: 'categories/topic'},
        {IsActive: true, Id: 6, IconCss: 'fa-caret-light', Name: 'Question bank', Url: 'categories/cauhoi'},
      ]
    },
  ]
  userFunctions: any[] = [
    {
      IsActive: true, Id: 7, IconCss: 'fa-bars', Name: 'Quiz', Children: [
        {IsActive: true, Id: 8, IconCss: 'fa-caret-light', Name: 'Do a quiz', Url: 'quiz'},
        {IsActive: true, Id: 9, IconCss: 'fa-caret-light', Name: 'Courses', Url: '/'},
      ]
    }
  ]

  ngOnInit() {
    // debugger;
    // const permissions = this.user.permissions;
    // console.log('permission',permissions);
    const userName = this.user.UserName;
    // console.log('roles',roles);
    let data = [];
    // let sideBar = clone(this.sideBarInfo);
    // console.log(this.sideBarInfo);
    // const dataSystems = clone(this.sideBarInfo.filter(o => o.Id == SystemConstants.SYSTEM));
    // const dataOther = clone(this.sideBarInfo.filter(o => o.Id !== SystemConstants.SYSTEM));
    if (userName.indexOf('admin') === -1) {
      // debugger;
      data.unshift(...this.userFunctions);
    } else {
      // for (let i = 0; i < dataOther.length; i++) {
      //   if (permissions && permissions.indexOf(dataOther[i].Id + '_' + SystemConstants.VIEW_ACTION) !== -1) {
      //     data.push(dataOther[i]);
      //     data[data.length - 1].Children = dataOther[i].Children
      //       .filter((o: any) => permissions.indexOf(o.Id + '_' + SystemConstants.VIEW_ACTION) !== -1);
      //   }
      // }

      data.unshift(...this.userFunctions);
      data.unshift(...this.sysFunctions);
    }
    this.functions = data;
    this.checkActiveParent();
    this.isActive = false;
    this.collapsed = true;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
    this.toggleCollapsed();
  }

  checkActive(item): boolean {
    // debugger;
    // console.log(this.showMenu);

    if(item.Children?.length > 0) {
      for(let i=0; i<item.Children.length; i++) {
        if(this.showMenu === item.Children[i].Id) {
          // console.log(item.Children[i]);
          return true;
        }
      }
    } else {
      if(this.showMenu === item.Id) {
        return true;
      }
    }

    return false;
  }

  activate(item: any) {
    // debugger;
    if(item.Children?.length > 0) {
      item.expand = !item.expand;
    }
    if (item.Id === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = item.Id;
    }
  }

  checkActiveParent() {
    this.functions.forEach(value => {
      if (value.Children.findIndex((o: any) => o.Url === this.router.url) !== -1) {
        value.IsActive = true;
      } else { value.IsActive = false; }
    });
  }
  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
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

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }
}
