import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';

const routes: Routes = [
    { path: '', redirectTo: ROUTES_NAME.LOGIN, pathMatch: 'full' },
    { path: ROUTES_NAME.LOGIN, loadChildren: () => import('@pages/auth/login/login.module').then( mod => mod.LoginModule) },
    { path: ROUTES_NAME.IDENTIFIER(':authToken'), loadChildren: () => import('@pages/auth/identifier/identifier.module').then( mod => mod.IdentifierModule) },
    { path: ROUTES_NAME.DASHBOARD, loadChildren: () => import('@pages/data/dashboard/dashboard.module').then( mod => mod.DashboardModule), canActivate: [UserAuthenticatedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
