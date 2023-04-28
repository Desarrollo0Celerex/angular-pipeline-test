import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LICENSES } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { Wallet } from '@interfaces/wallet.interface';
import { UpdateWalletIdentityDataSend } from '@interfaces/update-wallet-identity-data-send.interface';
import { WalletService } from '@services/wallet.service';

@Injectable()
export class IdentityService {
    canShowContainerShowCertificate: boolean = false;
    form: UntypedFormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;
    licenseId: number = 0;
    themeName: string = '';

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _walletService: WalletService
    ) { }

    get f(): { [key: string]: AbstractControl; }  {
        return this.form.controls;
    }

    buildForm(wallet: Wallet): void {
        this.form = this._formBuilder.group({
            name: [(!!wallet.name) ? wallet.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(15), ValidatorsHelper.brandName]],
            canShowCertificate: [(wallet.canShowCertificate === '1') ? true : false ]
        })

        // Update canShowCertificate only if your license allows it
        if(wallet.licenseId < LICENSES.PRO.ID) {
            this.f.canShowCertificate.disable();
        }
        this.isBuiltForm = true;
    }

    checkCanShowContainerShowCertificate(): void {
        if(this.licenseId < LICENSES.PRO.ID) {
            this.canShowContainerShowCertificate = true;
        }
    }

    loadWallet():Observable<Wallet> {
        const fields: string = 'name,themeName,canShowCertificate,licenseId';
        return this._walletService.getWallet(fields).pipe(
            tap((res: Wallet) => { 
                this.licenseId = res.licenseId;
                this.themeName = res.themeName;
            })
        );
    }

    updateWallet(): Observable<void> {
        const requestBody: UpdateWalletIdentityDataSend = this._getRequestBody();
        return this._walletService.updateWalletIdentity(requestBody);
    }

    private _getRequestBody(): UpdateWalletIdentityDataSend {
        const requestBody: UpdateWalletIdentityDataSend = {
            name: this.f.name.value,
            canShowCertificate: (this.f.canShowCertificate.value === true) ? '1' : '0'
        }
        return requestBody;
    }
}
