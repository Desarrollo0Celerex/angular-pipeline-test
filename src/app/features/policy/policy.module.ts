import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import { ModalSelectContactFieldsToRewriteComponent } from './components/modal-select-contact-fields-to-rewrite/modal-select-contact-fields-to-rewrite.component';
import { PolicySenderComponent } from './components/policy-sender/policy-sender.component';
import { SharedModule } from '@shared/shared.module';
import { GenderNamePipe } from '@shared/pipes/gender-name.pipe';
import { PhoneCodePipe } from '@shared/pipes/phone-code.pipe';
import { ModalSelectActionForSavedPolicyComponent } from './components/modal-select-action-for-saved-policy/modal-select-action-for-saved-policy.component';
import { RouterModule } from '@angular/router';
import { PolicyService } from './services/policy.service';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { TasksModule } from '@features/tasks/tasks.module';

@NgModule({
    declarations: [
        ModalSelectActionForSavedPolicyComponent,
        ModalSelectContactFieldsToRewriteComponent,
        PolicySenderComponent,
    ],
    exports: [
        ModalSelectActionForSavedPolicyComponent,
        ModalSelectContactFieldsToRewriteComponent,
    ],
    imports: [
        CommonModule,
        PolicyRoutingModule,
        RouterModule,
        SharedModule,
        ModalShowPolicyModule,
        TasksModule,
    ],
    providers: [GenderNamePipe, PhoneCodePipe, PolicyService],
})
export class PolicyModule {}
