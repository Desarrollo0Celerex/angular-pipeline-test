import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ContactSourceService } from '@services/contact-source.service';

import { ChartLeadAcquisitionChannelsComponent } from './chart-lead-acquisition-channels.component';

@NgModule({
  declarations: [
    ChartLeadAcquisitionChannelsComponent
  ],
  exports: [
      ChartLeadAcquisitionChannelsComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      ContactSourceService
  ]
})
export class ChartLeadAcquisitionChannelsModule { }
