import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePolicyRoutingModule } from './update-policy-routing.module';
import { UpdatePolicyPage } from './update-policy.page';


@NgModule({
  declarations: [UpdatePolicyPage],
  imports: [
    CommonModule,
    UpdatePolicyRoutingModule
  ]
})
export class UpdatePolicyModule { }
