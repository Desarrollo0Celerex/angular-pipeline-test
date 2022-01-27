import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';

import { ChartClientsComponent } from './chart-clients.component';

@NgModule({
  declarations: [
    ChartClientsComponent
  ],
  exports: [
      ChartClientsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ]
})
export class ChartClientsModule { }
