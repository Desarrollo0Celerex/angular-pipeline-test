import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardReportPartnerPaymentsAppliedComponent } from './card-report-partner-payments-applied.component';

import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module';
import { ReceiptPaidService } from '@services/receipt-paid.service';

@NgModule({
    declarations: [CardReportPartnerPaymentsAppliedComponent],
    exports: [CardReportPartnerPaymentsAppliedComponent],
    imports: [CommonModule, ModalSelectReportFormatModule],
    providers: [ReceiptPaidService],
})
export class CardReportPartnerPaymentsAppliedModule {}
