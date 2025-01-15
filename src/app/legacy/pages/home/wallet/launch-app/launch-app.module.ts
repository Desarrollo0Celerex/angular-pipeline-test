import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmShareAppModule } from '@components/modal-confirm-share-app/modal-confirm-share-app.module';
import { WalletService } from '@services/wallet.service';

import { LaunchAppRoutingModule } from './launch-app-routing.module';
import { LaunchAppPage } from './launch-app.page';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [LaunchAppPage],
    imports: [
        CommonModule,
        LaunchAppRoutingModule,
        LoadingContentModule,
        ModalConfirmShareAppModule,
        SharedModule,
    ],
    providers: [WalletService],
})
export class LaunchAppModule {}
