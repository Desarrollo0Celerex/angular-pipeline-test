import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';

import { ContactCenterRoutingModule } from './contact-center-routing.module';
import { ContactCenterLayout } from './contact-center.layout';


@NgModule({
  declarations: [
    ContactCenterLayout
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    ContactCenterRoutingModule
  ]
})
export class ContactCenterModule { }
