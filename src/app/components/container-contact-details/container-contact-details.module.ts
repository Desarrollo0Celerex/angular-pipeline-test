import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ContactService } from '@services/contact.service';

import { ContainerContactDetailsComponent } from './container-contact-details.component';
import { ContainerContactDetailsService } from './container-contact-details.service';

@NgModule({
  declarations: [ContainerContactDetailsComponent],
  exports: [ContainerContactDetailsComponent],
  imports: [
    CommonModule,
    LoadingContentModule,
    RouterModule
  ],
  providers: [ContainerContactDetailsService, ContactService]
})
export class ContainerContactDetailsModule { }
