import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Wallet } from '@interfaces/wallet.interface';
import { WalletTheme } from '@interfaces/wallet-theme.interface';
import { WalletService } from '@services/wallet.service';

@Injectable()
export class ThemeService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;
    selectedColorName: string = '';
    walletThemes: WalletTheme[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _walletService: WalletService
    ) { }

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

    loadWallet():Observable<Wallet> {
        const fields: string = 'iconsUrl,themeId';
        return this._walletService.getWallet(fields);
    }

    loadWalletThemes():Observable<void> {
        const fields: string = 'themeId,name';
        return this._walletService.getWalletThemes(fields).pipe(
            tap((res: WalletTheme[]) => {
                this.walletThemes = res;
            }),
            map(() => { })
        );
    }

    selectTheme(themeId: number): void {
        this.form.patchValue({themeId});
        this.selectedColorName = this.walletThemes[themeId-1].name;
        this._paintSelectedCheckbox(themeId);
    }

    updateWallet(): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._walletService.updateWalletTheme(requestBody);
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('icon', this.f.icon.value);
        requestBody.append('themeId', this.f.themeId.value);
        return requestBody;
    }

    private _paintSelectedCheckbox(selectedElement: number): void {
        const totalCheckbox: number = 8;
        for(let i=0; i<totalCheckbox; i++) {
            const selectedCheckbox: any = document.getElementById('walletTheme'+(i+1));
            if(!!selectedCheckbox) {
                selectedCheckbox.checked = false;
            }
        }
        setTimeout(() => {
            const selectedCheckbox: any = document.getElementById('walletTheme'+selectedElement);
            if(!!selectedCheckbox) {
                selectedCheckbox.checked = true;
            }
        },0);
    }
}
