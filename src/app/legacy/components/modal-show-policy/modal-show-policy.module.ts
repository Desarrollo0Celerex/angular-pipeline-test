import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '@services/policy.service';

import { ModalShowPolicyComponent } from './modal-show-policy.component';
import { ModalShowPolicyService } from './modal-show-policy.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [ModalShowPolicyComponent],
    exports: [ModalShowPolicyComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    providers: [ModalShowPolicyService, PolicyService],
})
export class ModalShowPolicyModule {}
