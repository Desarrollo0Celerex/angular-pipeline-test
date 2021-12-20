import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartLeadsVsClientsComponent } from './chart-leads-vs-clients.component';

@NgModule({
  declarations: [
    ChartLeadsVsClientsComponent
  ],
  exports: [
      ChartLeadsVsClientsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChartLeadsVsClientsModule { }
