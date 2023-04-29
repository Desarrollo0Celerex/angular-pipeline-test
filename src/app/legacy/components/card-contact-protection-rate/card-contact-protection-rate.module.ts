import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactService } from '@core/services/contact/contact.service';

import { CardContactProtectionRateComponent } from './card-contact-protection-rate.component';

@NgModule({
    declarations: [CardContactProtectionRateComponent],
    exports: [CardContactProtectionRateComponent],
    imports: [CommonModule],
    providers: [ContactService],
})
export class CardContactProtectionRateModule {}
