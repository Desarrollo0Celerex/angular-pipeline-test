import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactService } from '@services/contact.service';

import { CardContactSinistersRateComponent } from './card-contact-sinisters-rate.component';

@NgModule({
  declarations: [
    CardContactSinistersRateComponent
  ],
  exports: [
      CardContactSinistersRateComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [ContactService]
})
export class CardContactSinistersRateModule { }
