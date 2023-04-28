import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactNotFoundRoutingModule } from './contact-not-found-routing.module';
import { ContactNotFoundPage } from './contact-not-found.page';


@NgModule({
  declarations: [ContactNotFoundPage],
  imports: [
    CommonModule,
    ContactNotFoundRoutingModule
  ]
})
export class ContactNotFoundModule { }
