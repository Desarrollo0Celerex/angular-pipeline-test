import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerService } from '@services/partner.service';

import { ModalConfirmCreatePartnerComponent } from './modal-confirm-create-partner.component';

@NgModule({
  declarations: [
    ModalConfirmCreatePartnerComponent
  ],
  exports: [
      ModalConfirmCreatePartnerComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [PartnerService]
})
export class ModalConfirmCreatePartnerModule { }
