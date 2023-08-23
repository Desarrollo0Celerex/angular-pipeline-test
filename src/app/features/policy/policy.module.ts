import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import { SelectContactFieldsToRewriteComponent } from './components/select-contact-fields-to-rewrite/select-contact-fields-to-rewrite.component';
import { SendPolicyComponent } from './components/send-policy/send-policy.component';
import { SharedModule } from '@shared/shared.module';
import { GenderNamePipe } from '@shared/pipes/gender-name.pipe';
import { PhoneCodePipe } from '@shared/pipes/phone-code.pipe';
import { PolicyActionsComponent } from './components/policy-actions/policy-actions.component';
import { RouterModule } from '@angular/router';
import { PolicyService } from './services/policy.service';
import { DownloadPolicyComponent } from './components/download-policy/download-policy.component';

@NgModule({
    declarations: [
        PolicyActionsComponent,
        SelectContactFieldsToRewriteComponent,
        SendPolicyComponent,
        DownloadPolicyComponent,
    ],
    exports: [PolicyActionsComponent, SelectContactFieldsToRewriteComponent],
    imports: [CommonModule, PolicyRoutingModule, RouterModule, SharedModule],
    providers: [GenderNamePipe, PhoneCodePipe, PolicyService],
})
export class PolicyModule {}
