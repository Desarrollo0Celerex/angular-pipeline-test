import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmShareAppComponent } from './modal-confirm-share-app.component';

@NgModule({
  declarations: [
    ModalConfirmShareAppComponent
  ],
  exports: [ModalConfirmShareAppComponent],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmShareAppModule { }
