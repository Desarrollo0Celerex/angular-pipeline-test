import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartPoliciesComponent } from './chart-policies.component';

@NgModule({
  declarations: [
    ChartPoliciesComponent
  ],
  exports: [
      ChartPoliciesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChartPoliciesModule { }
