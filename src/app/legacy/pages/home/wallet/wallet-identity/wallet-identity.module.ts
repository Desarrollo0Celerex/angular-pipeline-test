import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmUpdateWalletModule } from '@components/modal-confirm-update-wallet/modal-confirm-update-wallet.module';
import { WalletService } from '@services/wallet.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

import { WalletIdentityRoutingModule } from './wallet-identity-routing.module';
import { WalletIdentityPage } from './wallet-identity.page';

@NgModule({
    declarations: [WalletIdentityPage],
    imports: [
        CommonModule,
        WalletIdentityRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingContentModule,
        ModalConfirmUpdateWalletModule,
    ],
    providers: [WalletService, WorkspaceService],
})
export class WalletIdentityModule {}
