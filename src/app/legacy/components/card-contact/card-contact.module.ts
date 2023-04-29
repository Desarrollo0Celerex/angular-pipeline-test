import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { CardContactComponent } from './card-contact.component';

@NgModule({
    declarations: [CardContactComponent],
    exports: [CardContactComponent],
    imports: [CommonModule, SharedModule],
})
export class CardContactModule {}
