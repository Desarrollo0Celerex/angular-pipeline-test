import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmCreateTwitterAccountModule } from '@components/modal-confirm-create-twitter-account/modal-confirm-create-twitter-account.module';
import { ModalConfirmUpdateSocialConnectModule } from '@components/modal-confirm-update-social-connect/modal-confirm-update-social-connect.module';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { TwitterRoutingModule } from './twitter-routing.module';
import { TwitterPage } from './twitter.page';

@NgModule({
    declarations: [TwitterPage],
    imports: [
        CommonModule,
        FormsModule,
        LoadingContentModule,
        ModalConfirmCreateTwitterAccountModule,
        ModalConfirmUpdateSocialConnectModule,
        ReactiveFormsModule,
        TwitterRoutingModule,
    ],
    providers: [WorkspaceService],
})
export class TwitterModule {}
