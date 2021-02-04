import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { ListLeadsRoutingModule } from './list-leads-routing.module';
import { ListLeadsPage } from './list-leads.page';


@NgModule({
  declarations: [ListLeadsPage],
  imports: [
    CommonModule,
    ContentsModule,
    ListLeadsRoutingModule
  ]
})
export class ListLeadsModule { }
