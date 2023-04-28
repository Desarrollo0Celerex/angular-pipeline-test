import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPage } from './pages/login/login.page';

@NgModule({
    declarations: [LoginPage],
    imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
