import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalFilterResultsComponent } from './modal-filter-results.component';

@NgModule({
  declarations: [
    ModalFilterResultsComponent
  ],
  exports: [
      ModalFilterResultsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalFilterResultsModule { }
