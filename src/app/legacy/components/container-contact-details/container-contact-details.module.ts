import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ContactStatusNameModule } from '@pipes/contact-status-name/contact-status-name.module';
import { ContactService } from '@services/contact.service';
import { PolicyService } from '@services/policy.service';

import { ContainerContactDetailsComponent } from './container-contact-details.component';
import { ContainerContactDetailsService } from './container-contact-details.service';

@NgModule({
  declarations: [ContainerContactDetailsComponent],
  exports: [ContainerContactDetailsComponent],
  imports: [
    CommonModule,
    ContactStatusNameModule,
    LoadingContentModule,
    RouterModule
  ],
  providers: [
    ContainerContactDetailsService, 
    ContactService,
    PolicyService
  ]
})
export class ContainerContactDetailsModule { }
