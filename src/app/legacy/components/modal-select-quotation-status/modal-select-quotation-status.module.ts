import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuotationStatusService } from '@services/quotation-status.service';

import { ModalSelectQuotationStatusComponent } from './modal-select-quotation-status.component';
import { ModalSelectQuotationStatusService } from './modal-select-quotation-status.service';
import { PluralModule } from '@pipes/plural/plural.module';

@NgModule({
    declarations: [ModalSelectQuotationStatusComponent],
    exports: [ModalSelectQuotationStatusComponent],
    imports: [CommonModule, RouterModule, PluralModule],
    providers: [ModalSelectQuotationStatusService, QuotationStatusService],
})
export class ModalSelectQuotationStatusModule {}
