import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerSelectStatsPeriodComponent } from './container-select-stats-period.component';

@NgModule({
  declarations: [
    ContainerSelectStatsPeriodComponent
  ],
  exports: [
      ContainerSelectStatsPeriodComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContainerSelectStatsPeriodModule { }
