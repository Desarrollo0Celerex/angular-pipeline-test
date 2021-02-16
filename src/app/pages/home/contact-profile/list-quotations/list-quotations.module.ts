import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileContentsModule } from '@components/profile-contents/profile-contents.module';

import { ListQuotationsRoutingModule } from './list-quotations-routing.module';
import { ListQuotationsPage } from './list-quotations.page';


@NgModule({
  declarations: [ListQuotationsPage],
  imports: [
    CommonModule,
    ListQuotationsRoutingModule,
    ProfileContentsModule
  ]
})
export class ListQuotationsModule { }
