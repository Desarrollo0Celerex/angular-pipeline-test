import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AUTH_ROUTES } from '@configs/routes.config';

import { LoginPage } from './pages/login/login.page';
import { IdentifyUserPage } from './pages/identify-user/identify-user.page';

const routes: Routes = [
    {
        path: AUTH_ROUTES.LOGIN,
        component: LoginPage,
    },
    {
        path: AUTH_ROUTES.IDENTIFY_USER(':authToken'),
        component: IdentifyUserPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
