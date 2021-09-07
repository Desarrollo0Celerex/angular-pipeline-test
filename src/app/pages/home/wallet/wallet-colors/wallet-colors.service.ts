import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Wallet } from '@interfaces/wallet.interface';
import { WalletService } from '@services/wallet.service';

@Injectable()
export class WalletColorsService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _walletService: WalletService
    ) { }

    /**
     * Get the form controls
     * @return Form controls
     */
    get f(): { [key: string]: AbstractControl; }  {
        return this.form.controls;
    }

    buildForm(wallet: Wallet): void {
        this.form = this._formBuilder.group({
            icon: (!!wallet.iconsUrl) ? [''] : ['', [Validators.required]],
            themeId: [(wallet.themeId) ? wallet.themeId : '1', [Validators.required]]
        })
        this.isBuiltForm = true;
    }

    loadWallet(walletId: string):Observable<Wallet> {
        const fields: string = 'iconsUrl,themeId';
        return this._walletService.getWallet(walletId, fields);
    }

    updateWallet(walletId: string): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._walletService.updateWalletTheme(walletId, requestBody);
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('icon', this.f.icon.value);
        requestBody.append('themeId', this.f.themeId.value);
        return requestBody;
    }
}
