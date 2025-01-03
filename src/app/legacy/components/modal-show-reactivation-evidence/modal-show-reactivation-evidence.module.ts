import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowReactivationEvidenceComponent } from './modal-show-reactivation-evidence.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [ModalShowReactivationEvidenceComponent],
    exports: [ModalShowReactivationEvidenceComponent],
    imports: [CommonModule, SharedModule],
})
export class ModalShowReactivationEvidenceModule {}
