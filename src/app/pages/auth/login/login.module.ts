import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { LoginService } from './login.service';


@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  providers: [LoginService]
})
export class LoginModule { }
