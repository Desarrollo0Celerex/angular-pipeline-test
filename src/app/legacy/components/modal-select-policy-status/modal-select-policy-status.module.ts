import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PolicyStatusService } from '@services/policy-status.service';

import { ModalSelectPolicyStatusComponent } from './modal-select-policy-status.component';
import { ModalSelectPolicyStatusService } from './modal-select-policy-status.service';
import { PluralModule } from '@pipes/plural/plural.module';

@NgModule({
    declarations: [ModalSelectPolicyStatusComponent],
    exports: [ModalSelectPolicyStatusComponent],
    imports: [CommonModule, RouterModule, PluralModule],
    providers: [ModalSelectPolicyStatusService, PolicyStatusService],
})
export class ModalSelectPolicyStatusModule {}
