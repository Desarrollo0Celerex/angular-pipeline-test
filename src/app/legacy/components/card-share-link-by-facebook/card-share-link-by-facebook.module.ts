import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardShareLinkByFacebookComponent } from './card-share-link-by-facebook.component';

@NgModule({
  declarations: [
    CardShareLinkByFacebookComponent
  ],
  exports: [
    CardShareLinkByFacebookComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardShareLinkByFacebookModule { }
