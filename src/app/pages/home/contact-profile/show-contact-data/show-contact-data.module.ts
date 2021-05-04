import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowContactDataRoutingModule } from './show-contact-data-routing.module';
import { ShowContactDataPage } from './show-contact-data.page';


@NgModule({
  declarations: [ShowContactDataPage],
  imports: [
    CommonModule,
    ShowContactDataRoutingModule
  ]
})
export class ShowContactDataModule { }
