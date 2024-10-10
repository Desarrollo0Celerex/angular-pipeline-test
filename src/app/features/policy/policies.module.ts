import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
import { CancelPolicyModalComponent } from './components/cancel-policy-modal/cancel-policy-modal.component';
import { CancelPolicyModalService } from './components/cancel-policy-modal/cancel-policy-modal.service';
import { PolicyActionsDeletedModalComponent } from './components/policy-actions-deleted-modal/policy-actions-deleted-modal.component';
import { PolicySinisterActionsModalComponent } from './components/policy-sinister-actions-modal/policy-sinister-actions-modal.component';
import { ModalCreateSinisterModule } from '@components/modal-create-sinister/modal-create-sinister.module';
import { SinisterModule } from '@sinister/sinister.module';
import { PolicyPaymentActionsModalComponent } from './components/policy-payment-actions-modal/policy-payment-actions-modal.component';
import { PolicyRecordActionsModalComponent } from './components/policy-record-actions-modal/policy-record-actions-modal.component';
import { PolicyReissueActionsModalComponent } from './components/policy-reissue-actions-modal/policy-reissue-actions-modal.component';
import { ModalConfirmReissuePolicyModule } from '@components/modal-confirm-reissue-policy/modal-confirm-reissue-policy.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { PolicyRenewalActionsModalComponent } from './components/policy-renewal-actions-modal/policy-renewal-actions-modal.component';
import { PolicyEndorsementActionsModalComponent } from './components/policy-endorsement-actions-modal/policy-endorsement-actions-modal.component';
import { PolicyUpdateActionsModalComponent } from './components/policy-update-actions-modal/policy-update-actions-modal.component';
import { UpdatePolicyFileModalComponent } from './components/update-policy-file-modal/update-policy-file-modal.component';
import { PolicyInsuredHolderFormComponent } from './components/policy-insured-holder-form/policy-insured-holder-form.component';
import { GenderModule } from '@gender/gender.module';
import { InsuredRelationModule } from '@insured-relation/insured-relation.module';

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
        CancelPolicyModalComponent,
        PolicyActionsDeletedModalComponent,
        PolicySinisterActionsModalComponent,
        PolicyPaymentActionsModalComponent,
        PolicyRecordActionsModalComponent,
        PolicyReissueActionsModalComponent,
        PolicyRenewalActionsModalComponent,
        PolicyEndorsementActionsModalComponent,
        PolicyUpdateActionsModalComponent,
        UpdatePolicyFileModalComponent,
        PolicyInsuredHolderFormComponent,
    ],
    exports: [
        CancelPolicyModalComponent,
        CreatePolicyModalComponent,
        PolicyActionsComponent,
        PolicyComplementsComponent,
        PolicyCoverCardComponent,
        PolicyEndorsementActionsModalComponent,
        PolicyHeaderComponent,
        PolicyInsuredHolderFormComponent,
        PolicyPaymentActionsModalComponent,
        PolicyRecordActionsModalComponent,
        PolicyReissueActionsModalComponent,
        PolicyRenewalActionsModalComponent,
        PolicySinisterActionsModalComponent,
        PolicyUpdateActionsModalComponent,
        SelectContactFieldsToRewriteComponent,
    ],
    imports: [
        CommonModule,
        GenderModule,
        InsuranceModule,
        InsuranceTypeModule,
        InsuredRelationModule,
        InsurerModule,
        NotifierModule,
        PoliciesRoutingModule,
        RouterModule,
        SharedModule,
        TasksModule,
        ReactiveFormsModule,
        SinisterModule,
        PolicyComplementModule,
        MatDatepickerModule,
        ModalCreateSinisterModule,
        ModalConfirmReissuePolicyModule,
        ModalSelectContactTypeModule,
    ],
    providers: [
        CancelPolicyModalService,
        GenderNamePipe,
        PhoneCodePipe,
        PolicyService,
    ],
})
export class PoliciesModule {}
