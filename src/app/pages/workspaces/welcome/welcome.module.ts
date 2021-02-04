import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '@services/user.service';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePage } from './welcome.page';
import { WelcomeService } from './welcome.service';


@NgModule({
  declarations: [WelcomePage],
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ],
  providers: [UserService, WelcomeService]
})
export class WelcomeModule { }
