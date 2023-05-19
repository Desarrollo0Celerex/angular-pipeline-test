import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinisterService } from '@services/sinister.service';

import { ModalShowSinisterDetailsComponent } from './modal-show-sinister-details.component';

@NgModule({
  declarations: [ModalShowSinisterDetailsComponent],
  exports: [ModalShowSinisterDetailsComponent],
  imports: [
    CommonModule
  ],
  providers: [
      SinisterService
  ]
})
export class ModalShowSinisterDetailsModule { }
