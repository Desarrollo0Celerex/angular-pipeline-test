import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentListModule } from '@components/content-list/content-list.module';

import { ListExternalPoliciesRoutingModule } from './list-external-policies-routing.module';
import { ListExternalPoliciesPage } from './list-external-policies.page';

@NgModule({
  declarations: [
    ListExternalPoliciesPage
  ],
  imports: [
    CommonModule,
    ListExternalPoliciesRoutingModule,
    ContentListModule
  ]
})
export class ListExternalPoliciesModule { }
