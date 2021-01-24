import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePage } from './welcome.page';
import { WelcomeService } from './welcome.service';


@NgModule({
  declarations: [WelcomePage],
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ],
  providers: [WelcomeService]
})
export class WelcomeModule { }
