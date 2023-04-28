import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmDeleteInsuredComponent } from './modal-confirm-delete-insured.component';

@NgModule({
  declarations: [
    ModalConfirmDeleteInsuredComponent
  ],
  exports: [
      ModalConfirmDeleteInsuredComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmDeleteInsuredModule { }
