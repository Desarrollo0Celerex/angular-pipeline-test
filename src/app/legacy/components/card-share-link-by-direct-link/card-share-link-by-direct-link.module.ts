import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShareLinkByDirectLinkModule } from '@components/modal-share-link-by-direct-link/modal-share-link-by-direct-link.module';

import { CardShareLinkByDirectLinkComponent } from './card-share-link-by-direct-link.component';

@NgModule({
  declarations: [
    CardShareLinkByDirectLinkComponent
  ],
  exports: [
    CardShareLinkByDirectLinkComponent
  ],
  imports: [
    CommonModule,
    ModalShareLinkByDirectLinkModule
  ]
})
export class CardShareLinkByDirectLinkModule { }
