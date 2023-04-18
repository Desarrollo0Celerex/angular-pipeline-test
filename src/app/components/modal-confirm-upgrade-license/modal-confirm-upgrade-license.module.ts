import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmUpgradeLicenseComponent } from './modal-confirm-upgrade-license.component';

@NgModule({
  declarations: [
    ModalConfirmUpgradeLicenseComponent
  ],
  exports: [
    ModalConfirmUpgradeLicenseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalConfirmUpgradeLicenseModule { }
