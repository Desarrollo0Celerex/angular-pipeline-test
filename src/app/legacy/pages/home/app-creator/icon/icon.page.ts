import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Wallet } from '@interfaces/wallet.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { IconService } from './icon.service';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-icon',
    templateUrl: './icon.page.html',
    styles: [],
    providers: [IconService],
})
export class IconPage implements OnInit {
    iconsUrl: string = '';
    modalIdConfirmUpdateWallet: string = 'agt-confirm-update-wallet';
    private _allowedFileTypes: string[] = ['png', 'jpg', 'jpeg'];
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: IconService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._loadWallet();
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
        if (constrolName === 'icon') {
            return validationClass === 'is-valid'
                ? 'agt-is-valid'
                : validationClass === 'is-invalid'
                ? 'agt-is-invalid'
                : '';
        }
        return validationClass;
    }

    selectIcon(event: any) {
        if (event.target.files.length > 0) {
            const icon = event.target.files[0];
            this.model.form.patchValue({ icon });
        }
    }

    showModalToConfirmUpdateWallet(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
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
            this.iconsUrl = !!wallet.iconsUrl
                ? wallet.iconsUrl + '384x384.png'
                : '';
            this.model.buildForm();
            setTimeout(() => {
                DropifyPlugin.init(this._allowedFileTypes);
            }, 0);
        });
    }
}
