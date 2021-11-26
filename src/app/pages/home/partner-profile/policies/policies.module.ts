import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesPage } from './policies.page';

@NgModule({
  declarations: [
    PoliciesPage
  ],
  imports: [
    CommonModule,
    ContentsModule,
    PoliciesRoutingModule
  ]
})
export class PoliciesModule { }
