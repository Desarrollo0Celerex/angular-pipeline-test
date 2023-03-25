import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardShareLinkByDirectLinkComponent } from './card-share-link-by-direct-link.component';

@NgModule({
  declarations: [
    CardShareLinkByDirectLinkComponent
  ],
  exports: [
    CardShareLinkByDirectLinkComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardShareLinkByDirectLinkModule { }
