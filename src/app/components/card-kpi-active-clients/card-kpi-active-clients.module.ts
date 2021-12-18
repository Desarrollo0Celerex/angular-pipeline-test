import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientService } from '@services/client.service';

import { CardKpiActiveClientsComponent } from './card-kpi-active-clients.component';

@NgModule({
  declarations: [
    CardKpiActiveClientsComponent
  ],
  exports: [
      CardKpiActiveClientsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      ClientService
  ]
})
export class CardKpiActiveClientsModule { }
