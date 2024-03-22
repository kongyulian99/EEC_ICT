import { SystemConstants } from 'src/app/shared/constants/systems.constant';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { FunctionsComponent } from './components/functions/functions.component';
import { RolesComponent } from './components/roles/roles.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { AuthGuard } from 'src/app/shared/guard';
import { LogsComponent } from './components/logs/logs.component';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'users',
        component: UsersComponent,
        data: {
            functionCode: SystemConstants.USER
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'functions',
        component: FunctionsComponent,
        data: {
            functionCode: SystemConstants.FUNCTION
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'roles',
        component: RolesComponent,
        data: {
            functionCode: SystemConstants.ROLE
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'permissions',
        component: PermissionsComponent,
        data: {
            functionCode: SystemConstants.PERMISSION
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'logs',
        component: LogsComponent,
        data: {
            functionCode: SystemConstants.LOGS
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemsRoutingModule {}
