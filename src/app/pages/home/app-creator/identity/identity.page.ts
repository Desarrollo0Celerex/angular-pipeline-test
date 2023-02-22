import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Wallet } from '@interfaces/wallet.interface';
import { LoadingService } from '@services/loading.service';

import { IdentityService } from './identity.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-identity',
  templateUrl: './identity.page.html',
  styles: [
  ],
  providers: [IdentityService]
})
export class IdentityPage implements OnInit {
    modalIdConfirmUpdateWallet: string = 'modal-confirm-update-wallet';
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: IdentityService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._loadWallet();
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
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
            this._router.navigateByUrl(ROUTES_NAME.appCreatorResume);
            AlertHelper.walletUpdated();
        });
    }

    private _loadWallet(): void {
        this.model.loadWallet().subscribe((wallet: Wallet) => {
            this.model.buildForm(wallet);
        })
    }
}
