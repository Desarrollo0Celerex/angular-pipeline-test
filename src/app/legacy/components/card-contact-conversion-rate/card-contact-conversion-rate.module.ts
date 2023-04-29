import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactService } from '@core/services/contact/contact.service';

import { CardContactConversionRateComponent } from './card-contact-conversion-rate.component';

@NgModule({
    declarations: [CardContactConversionRateComponent],
    exports: [CardContactConversionRateComponent],
    imports: [CommonModule],
    providers: [ContactService],
})
export class CardContactConversionRateModule {}
