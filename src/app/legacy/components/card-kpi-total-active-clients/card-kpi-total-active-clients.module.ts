import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientService } from '@services/client.service';

import { CardKpiTotalActiveClientsComponent } from './card-kpi-total-active-clients.component';

@NgModule({
  declarations: [
    CardKpiTotalActiveClientsComponent
  ],
  exports: [
      CardKpiTotalActiveClientsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      ClientService
  ]
})
export class CardKpiTotalActiveClientsModule { }
