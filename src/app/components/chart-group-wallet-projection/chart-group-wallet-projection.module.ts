import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { GroupService } from '@services/group.service';

import { ChartGroupWalletProjectionComponent } from './chart-group-wallet-projection.component';

@NgModule({
  declarations: [
    ChartGroupWalletProjectionComponent
  ],
  exports: [
      ChartGroupWalletProjectionComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      GroupService
  ]
})
export class ChartGroupWalletProjectionModule { }
