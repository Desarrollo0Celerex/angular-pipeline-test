import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { QuotationStatusService } from '@services/quotation-status.service';

import { ModalSelectQuotationStatusComponent } from './modal-select-quotation-status.component';
import { ModalSelectQuotationStatusService } from './modal-select-quotation-status.service';

@NgModule({
    declarations: [ModalSelectQuotationStatusComponent],
    exports: [ModalSelectQuotationStatusComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    providers: [ModalSelectQuotationStatusService, QuotationStatusService],
})
export class ModalSelectQuotationStatusModule {}
