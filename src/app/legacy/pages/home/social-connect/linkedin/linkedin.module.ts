import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmCreateLinkedinAccountModule } from '@components/modal-confirm-create-linkedin-account/modal-confirm-create-linkedin-account.module';
import { ModalConfirmUpdateSocialConnectModule } from '@components/modal-confirm-update-social-connect/modal-confirm-update-social-connect.module';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { LinkedinRoutingModule } from './linkedin-routing.module';
import { LinkedinPage } from './linkedin.page';

@NgModule({
    declarations: [LinkedinPage],
    imports: [
        CommonModule,
        FormsModule,
        LinkedinRoutingModule,
        LoadingContentModule,
        ModalConfirmCreateLinkedinAccountModule,
        ModalConfirmUpdateSocialConnectModule,
        ReactiveFormsModule,
    ],
    providers: [WorkspaceService],
})
export class LinkedinModule {}
