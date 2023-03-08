import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconRoutingModule } from './icon-routing.module';
import { IconPage } from './icon.page';


@NgModule({
  declarations: [
    IconPage
  ],
  imports: [
    CommonModule,
    IconRoutingModule
  ]
})
export class IconModule { }
