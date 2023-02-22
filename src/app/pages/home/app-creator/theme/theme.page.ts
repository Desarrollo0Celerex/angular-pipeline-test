import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Wallet } from '@interfaces/wallet.interface';
import { LoadingService } from '@services/loading.service';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

import { ThemeService } from './theme.service';

@Component({
  selector: 'agt-theme',
  templateUrl: './theme.page.html',
  styles: [
  ],
  providers: [ThemeService]
})
export class ThemePage implements OnInit {
    modalIdConfirmUpdateWallet: string = 'agt-confirm-update-wallet';
    iconsUrl: string = '';
    private _isFormSubmitted: boolean = false;
    private _allowedFileTypes: string[] = ['png', 'jpg', 'jpeg'];

    constructor(
        public model: ThemeService,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._loadWallet();
    }

    get backgroundImage(): string {
        return 'url("https://webkit.atombits.xyz/agenthos/mockups/agenthos_wallet_'+this.model.selectedColorName+'.png")';
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

    selectLogo(event: any) {
        if (event.target.files.length > 0) {
            const icon = event.target.files[0];
            this.model.form.patchValue({icon});
        }
    }

    confirmUpdateWallet(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            ModalPlugin.show(this.modalIdConfirmUpdateWallet);
        }
    }

    selectTheme(themeId: number): void {
        this.model.selectTheme(themeId);
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
            this.model.loadWalletThemes().subscribe(() => {
                this.iconsUrl = (!!wallet.iconsUrl) ? wallet.iconsUrl + '384x384.png' : '';
                this.model.buildForm(wallet);
                this.model.selectTheme(parseInt(this.model.f.themeId.value));
                setTimeout(() => {
                    DropifyPlugin.init(this._allowedFileTypes);
                }, 0);
            });
        });
    }
}
