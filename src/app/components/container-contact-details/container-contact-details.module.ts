import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactService } from '@services/contact.service';

import { ContainerContactDetailsComponent } from './container-contact-details.component';
import { ContainerContactDetailsService } from './container-contact-details.service';

@NgModule({
  declarations: [ContainerContactDetailsComponent],
  exports: [ContainerContactDetailsComponent],
  imports: [
    CommonModule
  ],
  providers: [ContainerContactDetailsService, ContactService]
})
export class ContainerContactDetailsModule { }
