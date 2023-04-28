import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardSinisterLogComponent } from './card-sinister-log.component';

@NgModule({
  declarations: [CardSinisterLogComponent],
  exports: [CardSinisterLogComponent],
  imports: [
    CommonModule
  ]
})
export class CardSinisterLogModule { }
