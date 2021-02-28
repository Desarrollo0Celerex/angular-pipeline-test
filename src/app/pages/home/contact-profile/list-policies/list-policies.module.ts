import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { ListPoliciesRoutingModule } from './list-policies-routing.module';
import { ListPoliciesPage } from './list-policies.page';


@NgModule({
  declarations: [ListPoliciesPage],
  imports: [
    CommonModule,
    ListPoliciesRoutingModule,
    ContentsModule
  ]
})
export class ListPoliciesModule { }
