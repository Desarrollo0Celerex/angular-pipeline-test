import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ClientService } from '@services/client.service';
import { LeadService } from '@services/lead.service';

import { ChartLeadsVsClientsComponent } from './chart-leads-vs-clients.component';

@NgModule({
  declarations: [
    ChartLeadsVsClientsComponent
  ],
  exports: [
      ChartLeadsVsClientsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      ClientService,
      LeadService
  ]
})
export class ChartLeadsVsClientsModule { }
