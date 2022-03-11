import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsExternalPoliciesModule } from '@components/container-charts-external-policies/container-charts-external-policies.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ListExternalPoliciesRoutingModule } from './list-external-policies-routing.module';
import { ListExternalPoliciesPage } from './list-external-policies.page';

@NgModule({
  declarations: [
    ListExternalPoliciesPage
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    ContainerChartsExternalPoliciesModule,
    ListExternalPoliciesRoutingModule,
    ContentListModule
  ]
})
export class ListExternalPoliciesModule { }
