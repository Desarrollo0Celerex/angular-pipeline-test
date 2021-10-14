import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowPartnerDetailsComponent } from './modal-show-partner-details.component';

@NgModule({
  declarations: [
    ModalShowPartnerDetailsComponent
  ],
  exports: [
      ModalShowPartnerDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalShowPartnerDetailsModule { }
