import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndorsementService } from '@services/endorsement.service';

import { ModalShowEndorsementComponent } from './modal-show-endorsement.component';
import { ModalShowEndorsementService } from './modal-show-endorsement.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [ModalShowEndorsementComponent],
    exports: [ModalShowEndorsementComponent],
    imports: [CommonModule, SharedModule],
    providers: [EndorsementService, ModalShowEndorsementService],
})
export class ModalShowEndorsementModule {}
