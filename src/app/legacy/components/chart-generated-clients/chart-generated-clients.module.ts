import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ClientService } from '@services/client.service';

import { ChartGeneratedClientsComponent } from './chart-generated-clients.component';

@NgModule({
  declarations: [
    ChartGeneratedClientsComponent
  ],
  exports: [ChartGeneratedClientsComponent],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      ClientService
  ]
})
export class ChartGeneratedClientsModule { }
