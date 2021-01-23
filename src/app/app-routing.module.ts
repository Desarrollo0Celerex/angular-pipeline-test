import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

const routes: Routes = [
    { path: '', redirectTo: ROUTES_NAME.login, pathMatch: 'full' },
    { path: ROUTES_NAME.login, loadChildren: () => import('@pages/auth/login/login.module').then( mod => mod.LoginModule) },
    { path: ROUTES_NAME.identifier(':authToken'), loadChildren: () => import('@pages/auth/identifier/identifier.module').then( mod => mod.IdentifierModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
