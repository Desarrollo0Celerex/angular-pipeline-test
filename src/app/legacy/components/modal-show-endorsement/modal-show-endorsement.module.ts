import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { EndorsementService } from '@services/endorsement.service';

import { ModalShowEndorsementComponent } from './modal-show-endorsement.component';
import { ModalShowEndorsementService } from './modal-show-endorsement.service';

@NgModule({
  declarations: [ModalShowEndorsementComponent],
  exports: [ModalShowEndorsementComponent],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ],
  providers: [EndorsementService, ModalShowEndorsementService]
})
export class ModalShowEndorsementModule { }
