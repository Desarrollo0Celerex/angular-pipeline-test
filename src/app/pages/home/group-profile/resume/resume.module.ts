import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardGroupWalletGlobalModule } from '@components/card-group-wallet-global/card-group-wallet-global.module';
import { ChartGroupWalletProjectionModule } from '@components/chart-group-wallet-projection/chart-group-wallet-projection.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumePage } from './resume.page';

@NgModule({
  declarations: [
    ResumePage
  ],
  imports: [
    CardGroupWalletGlobalModule,
    ChartGroupWalletProjectionModule,
    CommonModule,
    ResumeRoutingModule,
    ContentListModule
  ]
})
export class ResumeModule { }
