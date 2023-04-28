import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PluralNameFormatModule } from '@pipes/plural-name-format/plural-name-format.module';
import { SinisterStatusService } from '@services/sinister-status.service';

import { ModalSelectSinisterStatusComponent } from './modal-select-sinister-status.component';
import { ModalSelectSinisterStatusService } from './modal-select-sinister-status.service';

@NgModule({
  declarations: [ModalSelectSinisterStatusComponent],
  exports: [ModalSelectSinisterStatusComponent],
  imports: [
    CommonModule,
    PluralNameFormatModule,
    RouterModule
  ],
  providers: [ModalSelectSinisterStatusService, SinisterStatusService]
})
export class ModalSelectSinisterStatusModule { }
