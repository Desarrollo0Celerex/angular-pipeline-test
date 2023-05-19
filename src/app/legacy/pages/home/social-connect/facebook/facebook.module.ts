import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmCreateFacebookAccountModule } from '@components/modal-confirm-create-facebook-account/modal-confirm-create-facebook-account.module';
import { ModalConfirmUpdateSocialConnectModule } from '@components/modal-confirm-update-social-connect/modal-confirm-update-social-connect.module';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { FacebookRoutingModule } from './facebook-routing.module';
import { FacebookPage } from './facebook.page';

@NgModule({
    declarations: [FacebookPage],
    imports: [
        CommonModule,
        FacebookRoutingModule,
        FormsModule,
        LoadingContentModule,
        ModalConfirmCreateFacebookAccountModule,
        ModalConfirmUpdateSocialConnectModule,
        ReactiveFormsModule,
    ],
    providers: [WorkspaceService],
})
export class FacebookModule {}
