import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { ListIncompletePoliciesRoutingModule } from './list-incomplete-policies-routing.module';
import { ListIncompletePoliciesPage } from './list-incomplete-policies.page';

@NgModule({
  declarations: [
    ListIncompletePoliciesPage
  ],
  imports: [
    CommonModule,
    ContentsModule,
    ListIncompletePoliciesRoutingModule
  ]
})
export class ListIncompletePoliciesModule { }
