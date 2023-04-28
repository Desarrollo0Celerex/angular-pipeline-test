import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Wallet } from '@interfaces/wallet.interface';
import { WalletService } from '@services/wallet.service';

@Injectable()
export class IconService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;
    themeName: string = '';

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _walletService: WalletService
    ) { }

    get f(): { [key: string]: AbstractControl; }  {
        return this.form.controls;
    }

    buildForm(): void {
        this.form = this._formBuilder.group({
            icon: ['', [Validators.required]]
        })
        this.isBuiltForm = true;
    }

    loadWallet():Observable<Wallet> {
        const fields: string = 'iconsUrl,themeName';
        return this._walletService.getWallet(fields).pipe(
            tap((res: Wallet) => { this.themeName = res.themeName })
        );
    }

    updateWallet(): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._walletService.updateWalletIcon(requestBody);
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('icon', this.f.icon.value);
        return requestBody;
    }
}
