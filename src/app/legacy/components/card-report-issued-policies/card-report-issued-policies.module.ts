import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardReportIssuedPoliciesComponent } from './card-report-issued-policies.component';
import { PolicyService } from '@services/policy.service';
import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module';

@NgModule({
    declarations: [CardReportIssuedPoliciesComponent],
    exports: [CardReportIssuedPoliciesComponent],
    imports: [CommonModule, ModalSelectReportFormatModule],
    providers: [PolicyService],
})
export class CardReportIssuedPoliciesModule {}
