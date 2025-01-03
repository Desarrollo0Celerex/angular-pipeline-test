import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '@services/policy.service';

import { ModalShowPolicyFileComponent } from './modal-show-policy-file.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [ModalShowPolicyFileComponent],
    exports: [ModalShowPolicyFileComponent],
    imports: [CommonModule, SharedModule],
    providers: [PolicyService],
})
export class ModalShowPolicyFileModule {}
