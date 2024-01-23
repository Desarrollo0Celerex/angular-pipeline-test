import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { SelectContactFieldsToRewriteComponent } from './components/select-contact-fields-to-rewrite/select-contact-fields-to-rewrite.component';
import { SendPolicyComponent } from './components/send-policy/send-policy.component';
import { SharedModule } from '@shared/shared.module';
import { GenderNamePipe } from '@shared/pipes/gender-name.pipe';
import { PhoneCodePipe } from '@shared/pipes/phone-code.pipe';
import { PolicyActionsComponent } from './components/policy-actions/policy-actions.component';
import { RouterModule } from '@angular/router';
import { PolicyService } from './services/policy.service';
import { DownloadPolicyComponent } from './components/download-policy/download-policy.component';
import { TasksModule } from '@tasks/tasks.module';
import { FollowPolicyComponent } from './components/follow-policy/follow-policy.component';
import { PolicyHeaderComponent } from './components/policy-header/policy-header.component';
import { PolicyCoverCardComponent } from './components/policy-cover-card/policy-cover-card.component';
import { UpdatePolicyActionsModalComponent } from './components/update-policy-actions-modal/update-policy-actions-modal.component';
import { UpdatePolicyModalComponent } from './components/update-policy-modal/update-policy-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletePolicyModalComponent } from './components/delete-policy-modal/delete-policy-modal.component';
import { PolicyComplementsComponent } from './components/policy-complements/policy-complements.component';
import { PolicyComplementModule } from '@policy-complement/policy-complement.module';
import { SendPolicyModalComponent } from './components/send-policy-modal/send-policy-modal.component';
import { NotifierModule } from '@notifier/notifier.module';
import { SendWhatsappMessageModalComponent } from './components/send-whatsapp-message-modal/send-whatsapp-message-modal.component';
import { InsurerModule } from '@insurer/insurer.module';
import { InsuranceModule } from '@insurance/insurance.module';
import { InsuranceTypeModule } from '@insurance-type/insurance-type.module';
import { CreatePolicyModalComponent } from './components/create-policy-modal/create-policy-modal.component';

@NgModule({
    declarations: [
        PolicyActionsComponent,
        SelectContactFieldsToRewriteComponent,
        SendPolicyComponent,
        DownloadPolicyComponent,
        FollowPolicyComponent,
        PolicyHeaderComponent,
        PolicyCoverCardComponent,
        UpdatePolicyActionsModalComponent,
        UpdatePolicyModalComponent,
        DeletePolicyModalComponent,
        PolicyComplementsComponent,
        SendPolicyModalComponent,
        SendWhatsappMessageModalComponent,
        CreatePolicyModalComponent,
    ],
    exports: [
        CreatePolicyModalComponent,
        SelectContactFieldsToRewriteComponent,
        PolicyActionsComponent,
        PolicyHeaderComponent,
        PolicyCoverCardComponent,
        PolicyComplementsComponent,
    ],
    imports: [
        CommonModule,
        InsuranceModule,
        InsuranceTypeModule,
        InsurerModule,
        NotifierModule,
        PoliciesRoutingModule,
        RouterModule,
        SharedModule,
        TasksModule,
        ReactiveFormsModule,
        PolicyComplementModule,
    ],
    providers: [GenderNamePipe, PhoneCodePipe, PolicyService],
})
export class PoliciesModule {}
