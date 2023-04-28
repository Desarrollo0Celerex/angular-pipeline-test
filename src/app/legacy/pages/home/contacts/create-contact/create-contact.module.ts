import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerCreateContactModule } from '@components/container-create-contact/container-create-contact.module';

import { CreateContactRoutingModule } from './create-contact-routing.module';
import { CreateContactPage } from './create-contact.page';

@NgModule({
  declarations: [CreateContactPage],
  imports: [
    CommonModule,
    ContainerCreateContactModule,
    CreateContactRoutingModule
  ]
})
export class CreateContactModule { }
