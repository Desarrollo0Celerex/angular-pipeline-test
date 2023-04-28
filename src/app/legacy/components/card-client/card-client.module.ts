import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardClientComponent } from './card-client.component';

@NgModule({
  declarations: [CardClientComponent],
  exports: [CardClientComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CardClientModule { }
