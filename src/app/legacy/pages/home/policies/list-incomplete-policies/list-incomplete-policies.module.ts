import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { ContainerChartsIncompletePoliciesModule } from '@components/container-charts-incomplete-policies/container-charts-incomplete-policies.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ListIncompletePoliciesRoutingModule } from './list-incomplete-policies-routing.module';
import { ListIncompletePoliciesPage } from './list-incomplete-policies.page';

@NgModule({
  declarations: [
    ListIncompletePoliciesPage
  ],
  imports: [
    CardContentTitleModule,
    CommonModule,
    ContainerChartsIncompletePoliciesModule,
    ContentListModule,
    ListIncompletePoliciesRoutingModule
  ]
})
export class ListIncompletePoliciesModule { }
