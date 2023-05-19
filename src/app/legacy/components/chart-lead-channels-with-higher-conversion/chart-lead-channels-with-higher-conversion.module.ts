import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { QuotationService } from '@services/quotation.service';

import { ChartLeadChannelsWithHigherConversionComponent } from './chart-lead-channels-with-higher-conversion.component';

@NgModule({
  declarations: [
    ChartLeadChannelsWithHigherConversionComponent
  ],
  exports: [
      ChartLeadChannelsWithHigherConversionComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      QuotationService
  ]
})
export class ChartLeadChannelsWithHigherConversionModule { }
