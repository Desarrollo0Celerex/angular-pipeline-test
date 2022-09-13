import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyInsuredService } from '@services/policy-insured.service';

import { ContainerInsuredDetailsComponent } from './container-insured-details.component';

@NgModule({
  declarations: [
    ContainerInsuredDetailsComponent
  ],
  exports: [
      ContainerInsuredDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      PolicyInsuredService
  ]
})
export class ContainerInsuredDetailsModule { }
