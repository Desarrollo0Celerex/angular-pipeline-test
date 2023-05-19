import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { GroupService } from '@services/group.service';

import { ChartGroupGlobalBalanceComponent } from './chart-group-global-balance.component';

@NgModule({
  declarations: [
    ChartGroupGlobalBalanceComponent
  ],
  exports: [
      ChartGroupGlobalBalanceComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      GroupService
  ]
})
export class ChartGroupGlobalBalanceModule { }
