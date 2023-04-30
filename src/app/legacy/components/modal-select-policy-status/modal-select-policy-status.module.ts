import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { PolicyStatusService } from '@services/policy-status.service';

import { ModalSelectPolicyStatusComponent } from './modal-select-policy-status.component';
import { ModalSelectPolicyStatusService } from './modal-select-policy-status.service';

@NgModule({
    declarations: [ModalSelectPolicyStatusComponent],
    exports: [ModalSelectPolicyStatusComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    providers: [ModalSelectPolicyStatusService, PolicyStatusService],
})
export class ModalSelectPolicyStatusModule {}
