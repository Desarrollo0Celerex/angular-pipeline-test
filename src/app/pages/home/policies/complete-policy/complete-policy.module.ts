import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContactModule } from '@components/card-contact/card-contact.module';

import { CompletePolicyRoutingModule } from './complete-policy-routing.module';
import { CompletePolicyPage } from './complete-policy.page';


@NgModule({
  declarations: [CompletePolicyPage],
  imports: [
    CardContactModule,
    CommonModule,
    CompletePolicyRoutingModule
  ]
})
export class CompletePolicyModule { }
