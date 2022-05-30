import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartGroupWalletProjectionModule } from '@components/chart-group-wallet-projection/chart-group-wallet-projection.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';

@NgModule({
  declarations: [
    ResumePage
  ],
  imports: [
    ChartGroupWalletProjectionModule,
    CommonModule,
    ResumeRoutingModule,
    ContentListModule
  ]
})
export class ResumeModule { }
