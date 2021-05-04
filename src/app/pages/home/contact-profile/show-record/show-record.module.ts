import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowRecordRoutingModule } from './show-record-routing.module';
import { ShowRecordPage } from './show-record.page';


@NgModule({
  declarations: [ShowRecordPage],
  imports: [
    CommonModule,
    ShowRecordRoutingModule
  ]
})
export class ShowRecordModule { }
