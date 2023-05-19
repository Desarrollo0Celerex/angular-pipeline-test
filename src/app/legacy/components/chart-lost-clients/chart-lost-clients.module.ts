import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ClientService } from '@services/client.service';

import { ChartLostClientsComponent } from './chart-lost-clients.component';

@NgModule({
  declarations: [
    ChartLostClientsComponent
  ],
  exports: [
      ChartLostClientsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      ClientService
  ]
})
export class ChartLostClientsModule { }
