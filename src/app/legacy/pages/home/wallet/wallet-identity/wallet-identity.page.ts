import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Wallet } from '@interfaces/wallet.interface';
import { LoadingService } from '@services/loading.service';

import { WalletIdentityService } from './wallet-identity.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-wallet-identity',
  templateUrl: './wallet-identity.page.html',
  styles: [
  ],
  providers: [WalletIdentityService]
})
export class WalletIdentityPage implements OnInit {
    walletId: string = '';
    modalIdConfirmUpdateWallet: string = 'modal-confirm-update-wallet';
    private _isFormSubmitted: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router,
        private _walletIdentityService: WalletIdentityService
    ) { }

    ngOnInit(): void {
        this._catchParams();
        this._loadWallet();
    }

    get model(): WalletIdentityService {
        return this._walletIdentityService;
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
        if(constrolName === 'icon') {
            return (validationClass === 'is-valid') ? 'agt-is-valid' : (validationClass === 'is-invalid') ? 'agt-is-invalid' : '';
        }
        return validationClass;
    }

    confirmUpdateWallet(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            ModalPlugin.show(this.modalIdConfirmUpdateWallet);
        }
    }

    updateWallet(): void {
        this._loadingService.show();
        this.model.updateWallet().subscribe(() => {
            this._loadingService.hide();
            this.model.form.controls['walletKey'].disable();
            AlertHelper.walletUpdated();
        });
    }

    private _catchParams(): void {
        this.walletId = this._activatedRoute.snapshot.params.walletId;
    }

    private _loadWallet(): void {
        this.model.loadWallet().subscribe((wallet: Wallet) => {
            this.model.buildForm(wallet);
        })
    }

    private _reloadPage(context: WalletIdentityPage): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        context._router.navigate(['/' + ROUTES_NAME.walletResume(context.walletId)], { relativeTo: context._activatedRoute });
    }
}
