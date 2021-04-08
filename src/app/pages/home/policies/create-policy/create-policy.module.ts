import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePolicyRoutingModule } from './create-policy-routing.module';
import { CreatePolicyPage } from './create-policy.page';
import { CreatePolicyService } from './create-policy.service';


@NgModule({
  declarations: [CreatePolicyPage],
  imports: [
    CommonModule,
    CreatePolicyRoutingModule
  ],
  providers: [CreatePolicyService]
})
export class CreatePolicyModule { }
