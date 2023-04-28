import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';

import { ChartContactTypesComponent } from './chart-contact-types.component';

@NgModule({
  declarations: [
    ChartContactTypesComponent
  ],
  exports: [
      ChartContactTypesComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ]
})
export class ChartContactTypesModule { }
