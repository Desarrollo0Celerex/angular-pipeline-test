import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmCreateInstagramAccountModule } from '@components/modal-confirm-create-instagram-account/modal-confirm-create-instagram-account.module';
import { ModalConfirmUpdateSocialConnectModule } from '@components/modal-confirm-update-social-connect/modal-confirm-update-social-connect.module';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { InstagramRoutingModule } from './instagram-routing.module';
import { InstagramPage } from './instagram.page';

@NgModule({
    declarations: [InstagramPage],
    imports: [
        CommonModule,
        FormsModule,
        InstagramRoutingModule,
        LoadingContentModule,
        ModalConfirmCreateInstagramAccountModule,
        ModalConfirmUpdateSocialConnectModule,
        ReactiveFormsModule,
    ],
    providers: [WorkspaceService],
})
export class InstagramModule {}
