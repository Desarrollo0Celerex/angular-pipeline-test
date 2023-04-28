import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Wallet } from '@interfaces/wallet.interface';
import { LoadingService } from '@services/loading.service';

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
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ThemeService,
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

    showModalToConfirmUpdateWallet(): void {
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
                this.model.buildForm(wallet);
                this.model.selectTheme(parseInt(this.model.f.themeId.value));
            });
        });
    }
}
