import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContactComponent } from './card-contact.component';
import { ContactStatusNameModule } from '@pipes/contact-status-name/contact-status-name.module';

@NgModule({
    declarations: [CardContactComponent],
    exports: [CardContactComponent],
    imports: [CommonModule, ContactStatusNameModule],
})
export class CardContactModule {}
