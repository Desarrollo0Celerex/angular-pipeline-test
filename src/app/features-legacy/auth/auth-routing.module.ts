import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AUTH_ROUTES } from '@core/constants/routes';

import { LoginPage } from './pages/login/login.page';
import { IdentifyUserPage } from './pages/identify-user/identify-user.page';
import { AuthenticateUserPage } from './pages/authenticate-user/authenticate-user.page';

const routes: Routes = [
    {
        path: AUTH_ROUTES.LOGIN,
        component: LoginPage,
    },
    {
        path: AUTH_ROUTES.IDENTIFY_USER(':authToken'),
        component: IdentifyUserPage,
    },
    {
        path: AUTH_ROUTES.AUTHENTICATE_USER(':userToken'),
        component: AuthenticateUserPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
