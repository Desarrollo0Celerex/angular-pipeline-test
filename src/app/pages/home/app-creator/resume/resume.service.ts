import { Injectable } from '@angular/core';

import { Wallet } from '@interfaces/wallet.interface';
import { WalletService } from '@services/wallet.service';

@Injectable()
export class ResumeService {
    isCompletedIdentity: boolean | null = null;
    isCompletedTheme: boolean | null = null;
    
    constructor(private _walletService: WalletService) { }

    loadWallet(): void {
        const fields: string = 'name,themeId';
        this._walletService.getWallet(fields).subscribe((res: Wallet) => {
            this.isCompletedIdentity = (res.name !== null) ? true : false;
            this.isCompletedTheme = (res.themeId !== null) ? true : false;
        });
    }
}
