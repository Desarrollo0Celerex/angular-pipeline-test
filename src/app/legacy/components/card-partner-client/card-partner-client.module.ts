import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardPartnerClientComponent } from './card-partner-client.component';

@NgModule({
  declarations: [
    CardPartnerClientComponent
  ],
  exports: [
      CardPartnerClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CardPartnerClientModule { }
