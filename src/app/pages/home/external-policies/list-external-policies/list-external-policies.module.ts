import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListExternalPoliciesRoutingModule } from './list-external-policies-routing.module';
import { ListExternalPoliciesPage } from './list-external-policies.page';


@NgModule({
  declarations: [
    ListExternalPoliciesPage
  ],
  imports: [
    CommonModule,
    ListExternalPoliciesRoutingModule
  ]
})
export class ListExternalPoliciesModule { }
