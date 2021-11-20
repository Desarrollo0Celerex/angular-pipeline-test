import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentKpisModule } from '@components/content-kpis/content-kpis.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { LastCancelledPoliciesRoutingModule } from './last-cancelled-policies-routing.module';
import { LastCancelledPoliciesPage } from './last-cancelled-policies.page';


@NgModule({
  declarations: [
    LastCancelledPoliciesPage
  ],
  imports: [
    CommonModule,
    ContentListModule,
    ContentKpisModule,
    LastCancelledPoliciesRoutingModule
  ]
})
export class LastCancelledPoliciesModule { }
