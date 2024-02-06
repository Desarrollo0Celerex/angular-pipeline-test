import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayout } from './layout/home.layout';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalVoiceControlCommandNotFoundComponent } from './components/modal-voice-control-command-not-found/modal-voice-control-command-not-found.component';
import { ModalVoiceControlContactResultsComponent } from './components/modal-voice-control-contact-results/modal-voice-control-contact-results.component';
import { ModalVoiceControlNoResultsComponent } from './components/modal-voice-control-no-results/modal-voice-control-no-results.component';
import { ModalVoiceControlNotSupportedComponent } from './components/modal-voice-control-not-supported/modal-voice-control-not-supported.component';
import { ModalVoiceControlProcessingRequestComponent } from './components/modal-voice-control-processing-request/modal-voice-control-processing-request.component';
import { ModalVoiceControlTalkingComponent } from './components/modal-voice-control-talking/modal-voice-control-talking.component';
import { SpeechRecognitionComponent } from './components/speech-recognition/speech-recognition.component';
import { VoiceControlService } from './services/voice-control/voice-control.service';
import { WorkspaceQuickActionsModalComponent } from './components/workspace-quick-actions-modal/workspace-quick-actions-modal.component';
import { WorkspaceReportActionsModalComponent } from './components/workspace-report-actions-modal/workspace-report-actions-modal.component';
import { ModalSelectContactActionModule } from '@components/modal-select-contact-action/modal-select-contact-action.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalSearchContactModule } from '@components/modal-search-contact/modal-search-contact.module';
import { TasksModule } from '@tasks/tasks.module';
import { ModalConfirmGoToAgenthosSupportModule } from '@components/modal-confirm-go-to-agenthos-support/modal-confirm-go-to-agenthos-support.module';
import { ContactModule } from '@contact/contact.module';
import { PoliciesModule } from '@policy/policies.module';
import { ClientModule } from '@client/client.module';

@NgModule({
    declarations: [
        FooterComponent,
        HomeLayout,
        HeaderComponent,
        ModalVoiceControlCommandNotFoundComponent,
        ModalVoiceControlContactResultsComponent,
        ModalVoiceControlNoResultsComponent,
        ModalVoiceControlNotSupportedComponent,
        ModalVoiceControlProcessingRequestComponent,
        ModalVoiceControlTalkingComponent,
        NavbarComponent,
        PageHeaderComponent,
        SidebarComponent,
        SpeechRecognitionComponent,
        WorkspaceQuickActionsModalComponent,
        WorkspaceReportActionsModalComponent,
    ],
    imports: [
        ClientModule,
        CommonModule,
        ContactModule,
        HomeRoutingModule,
        SharedModule,
        ModalSelectContactActionModule,
        ModalSelectContactTypeModule,
        ModalSearchContactModule,
        TasksModule,
        ModalConfirmGoToAgenthosSupportModule,
        PoliciesModule,
    ],
    providers: [VoiceControlService],
})
export class HomeModule {}
