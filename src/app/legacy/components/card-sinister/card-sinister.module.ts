import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardSinisterComponent } from './card-sinister.component';

@NgModule({
  declarations: [CardSinisterComponent],
  exports: [CardSinisterComponent],
  imports: [
    CommonModule
  ]
})
export class CardSinisterModule { }
