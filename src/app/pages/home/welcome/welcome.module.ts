import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardModuleModule } from '@components/card-module/card-module.module';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePage } from './welcome.page';

@NgModule({
  declarations: [
    WelcomePage
  ],
  imports: [
    CardContentTitleModule,
    CardModuleModule,
    CommonModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
