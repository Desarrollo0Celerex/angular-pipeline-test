import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSelectEvidenceComponent } from './modal-select-evidence.component';

@NgModule({
  declarations: [ModalSelectEvidenceComponent],
  exports: [ModalSelectEvidenceComponent],
  imports: [
    CommonModule
  ]
})
export class ModalSelectEvidenceModule { }
