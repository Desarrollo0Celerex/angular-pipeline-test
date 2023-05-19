import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsModule } from '@components/contents/contents.module';

import { ListQuotationsRoutingModule } from './list-quotations-routing.module';
import { ListQuotationsPage } from './list-quotations.page';

@NgModule({
  declarations: [ListQuotationsPage],
  imports: [
    CommonModule,
    ContentsModule,
    ListQuotationsRoutingModule,
  ]
})
export class ListQuotationsModule { }
