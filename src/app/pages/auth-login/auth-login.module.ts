import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLoginRoutingModule } from './auth-login-routing.module';
import { AuthLoginPage } from './auth-login.page';
import { AuthLoginService } from './auth-login.service';


@NgModule({
  declarations: [AuthLoginPage],
  imports: [
    CommonModule,
    AuthLoginRoutingModule
  ],
  providers: [AuthLoginService]
})
export class AuthLoginModule { }
