import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowEndorsementSummaryComponent } from './modal-show-endorsement-summary.component';

@NgModule({
  declarations: [ModalShowEndorsementSummaryComponent],
  exports: [ModalShowEndorsementSummaryComponent],
  imports: [
    CommonModule
  ]
})
export class ModalShowEndorsementSummaryModule { }
