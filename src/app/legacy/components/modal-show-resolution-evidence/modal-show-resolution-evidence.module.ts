import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowResolutionEvidenceComponent } from './modal-show-resolution-evidence.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [ModalShowResolutionEvidenceComponent],
    exports: [ModalShowResolutionEvidenceComponent],
    imports: [CommonModule, SharedModule],
})
export class ModalShowResolutionEvidenceModule {}
