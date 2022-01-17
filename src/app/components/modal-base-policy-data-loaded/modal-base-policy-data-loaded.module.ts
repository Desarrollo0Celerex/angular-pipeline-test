import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalBasePolicyDataLoadedComponent } from './modal-base-policy-data-loaded.component';

@NgModule({
  declarations: [
    ModalBasePolicyDataLoadedComponent
  ],
  exports: [
      ModalBasePolicyDataLoadedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalBasePolicyDataLoadedModule { }
