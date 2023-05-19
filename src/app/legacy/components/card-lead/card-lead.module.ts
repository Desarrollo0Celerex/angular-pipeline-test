import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardLeadComponent } from './card-lead.component';

@NgModule({
  declarations: [CardLeadComponent],
  exports: [CardLeadComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CardLeadModule { }
