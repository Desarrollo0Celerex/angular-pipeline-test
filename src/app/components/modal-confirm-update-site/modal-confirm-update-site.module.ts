import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmUpdateSiteComponent } from './modal-confirm-update-site.component';

@NgModule({
  declarations: [
    ModalConfirmUpdateSiteComponent
  ],
  exports: [
    ModalConfirmUpdateSiteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmUpdateSiteModule { }
