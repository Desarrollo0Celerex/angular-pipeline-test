import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalDoCollectionAdjustmentComponent } from './modal-do-collection-adjustment.component';
import { ModalDoCollectionAdjustmentService } from './modal-do-collection-adjustment.service';

@NgModule({
  declarations: [ModalDoCollectionAdjustmentComponent],
  exports: [ModalDoCollectionAdjustmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ModalDoCollectionAdjustmentService]
})
export class ModalDoCollectionAdjustmentModule { }
