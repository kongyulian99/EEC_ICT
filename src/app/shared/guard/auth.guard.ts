import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenService } from '../services/auth.service';
import { SystemConstants } from '../constants/systems.constant';
// import * as jwt_decode from 'jwt-decode';
import jwt_decode from "jwt-decode";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const user: any = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER) as string);

      if(user !== null) {
        return true;
      } else {
        return false;
      }
      // const functionCode = route.data['functionCode'] as string ?? '';
      // console.log(functionCode);
      // const roles = user.roles;
      // console.log(roles);
      // if (roles.indexOf('root') === -1) {  // Nếu không phải quyền root thì phải check quyền truy cập
      //   const permissions = user.permissions;
      //   const functionsCode = functionCode.split(',');
      //   // console.log(permissions);

      //   for(let i = 0; i<functionsCode.length; i++){
      //     if(functionsCode[i].indexOf("_UPDATE")!==-1){
      //       if(permissions && permissions.indexOf(functionCode) !== -1){
      //         return true;
      //       }
      //     }
      //     if(functionsCode[i].indexOf("_CREATE")!==-1){
      //       if(permissions && permissions.indexOf(functionCode) !== -1) {
      //         return true;
      //       }
      //     }
      //     if ((permissions && permissions.indexOf(functionsCode[i] + '_' + SystemConstants.VIEW_ACTION) !== -1) || functionCode === 'DASHBOARD') {
      //       return true;
      //     } else if(permissions && permissions.indexOf(functionsCode[i] + '_' + SystemConstants.VIEW_ACTION) === -1 && functionCode === SystemConstants.GIAMSAT) {
      //       this.router.navigate(['/administration/dashboard'], {
      //         // queryParams: { redirect: state.url }
      //       });
      //       return false;
      //     }
      //   }
      //   this.router.navigate(['/access-denied'], {
      //     queryParams: { redirect: state.url }
      //   });
      //   return false;
      // } else { return true; }
    } else {
      this.router.navigate(['/login'], {
        // queryParams: { redirect: state.url }
      });
      return false;
    }
    // this.router.navigate(['/access-denied']);
    // // console.log('login');
    // return false;
  }
}
