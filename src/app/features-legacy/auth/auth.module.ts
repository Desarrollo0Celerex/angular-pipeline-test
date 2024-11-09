import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPage } from './pages/login/login.page';
import { IdentifyUserPage } from './pages/identify-user/identify-user.page';
import { AuthenticateUserPage } from './pages/authenticate-user/authenticate-user.page';

@NgModule({
    declarations: [LoginPage, IdentifyUserPage, AuthenticateUserPage],
    imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
