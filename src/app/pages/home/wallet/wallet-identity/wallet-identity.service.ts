import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { Wallet } from '@interfaces/wallet.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { UpdateWalletDataSend } from '@interfaces/update-wallet-data-send.interface';
import { WalletService } from '@services/wallet.service';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class WalletIdentityService {
    form: UntypedFormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _walletService: WalletService,
        private _workspaceService: WorkspaceService
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
            name: [(!!wallet.name) ? wallet.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(15), ValidatorsHelper.brandName]],
            walletKey: [{ value: (!!wallet.walletKey) ? wallet.walletKey : '', disabled: (!!wallet.walletKey) ? true : false }, [Validators.required, Validators.minLength(3), Validators.maxLength(15), ValidatorsHelper.username]],
        })
        this.isBuiltForm = true;
    }

    loadWallet(walletId: string):Observable<Wallet> {
        const fields: string = 'walletKey,name';
        return this._walletService.getWallet(walletId, fields);
    }

    loadWorkspace(): Observable<HttpResponse> {
        const fields: string = 'brandName';
        return this._workspaceService.getWorkspace(fields);
    }

    updateWallet(walletId: string): Observable<void> {
        const requestBody: UpdateWalletDataSend = this._getRequestBody();
        return this._walletService.updateWallet(walletId, requestBody);
    }

    private _getRequestBody(): UpdateWalletDataSend {
        const requestBody: UpdateWalletDataSend = {
            name: this.f.name.value,
            walletKey: this.f.walletKey.value
        }
        return requestBody;
    }
}
