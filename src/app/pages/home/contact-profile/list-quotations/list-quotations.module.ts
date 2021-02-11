import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListQuotationsRoutingModule } from './list-quotations-routing.module';
import { ListQuotationsPage } from './list-quotations.page';


@NgModule({
  declarations: [ListQuotationsPage],
  imports: [
    CommonModule,
    ListQuotationsRoutingModule
  ]
})
export class ListQuotationsModule { }
