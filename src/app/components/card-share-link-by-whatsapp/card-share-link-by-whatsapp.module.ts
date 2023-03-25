import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardShareLinkByWhatsappComponent } from './card-share-link-by-whatsapp.component';

@NgModule({
  declarations: [
    CardShareLinkByWhatsappComponent
  ],
  exports: [
    CardShareLinkByWhatsappComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardShareLinkByWhatsappModule { }
