import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelledPolicyService } from '@services/cancelled-policy.service';

import { ModalShowCancellationEvidenceComponent } from './modal-show-cancellation-evidence.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [ModalShowCancellationEvidenceComponent],
    exports: [ModalShowCancellationEvidenceComponent],
    imports: [CommonModule, SharedModule],
    providers: [CancelledPolicyService],
})
export class ModalShowCancellationEvidenceModule {}
