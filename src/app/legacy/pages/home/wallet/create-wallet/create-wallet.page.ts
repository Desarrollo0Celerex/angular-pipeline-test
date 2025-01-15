import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { LoadingService } from '@core/services/loading/loading.service';

import { CreateWalletService } from './create-wallet.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-create-wallet',
    templateUrl: './create-wallet.page.html',
    styles: [],
    providers: [CreateWalletService],
    standalone: false
})
export class CreateWalletPage {
    isWalletIdLoaded: boolean = false;
    modalIdConfirmCreateWallet: string = 'modal-confirm-create-wallet';
    private _walletId: string = '';

    constructor(
        private _createWalletService: CreateWalletService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    get model(): CreateWalletService {
        return this._createWalletService;
    }

    confirmCreateWallet(): void {
        ModalPlugin.show(this.modalIdConfirmCreateWallet);
    }

    createWallet(): void {
        this._loadingService.show();
        this.model.createWallet().subscribe((walletId: string) => {
            this._loadingService.hide();
            this._router.navigateByUrl(ROUTES_NAME.walletIdentity(walletId));
        });
    }

    private _goToWalletIdentity(context: CreateWalletPage): void {
        context._router.navigateByUrl(
            ROUTES_NAME.walletResume(context._walletId)
        );
    }
}
