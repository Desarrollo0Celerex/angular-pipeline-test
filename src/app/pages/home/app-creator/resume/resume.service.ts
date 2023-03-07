import { Injectable } from '@angular/core';

import { Wallet } from '@interfaces/wallet.interface';
import { WalletService } from '@services/wallet.service';

@Injectable()
export class ResumeService {
    isCompletedIdentity: boolean | null = null;
    isCompletedIcon: boolean | null = null;
    isCompletedTheme: boolean | null = null;
    wallet: Wallet | null = null;
    
    constructor(private _walletService: WalletService) { }

    loadWallet(): void {
        const fields: string = 'name,themeId,themeName,iconsUrl,walletKey,createdAt,updatedAt';
        this._walletService.getWallet(fields).subscribe((res: Wallet) => {
            this.wallet = res;
            this.isCompletedIdentity = (res.name !== null) ? true : false;
            this.isCompletedIcon = (res.iconsUrl !== null) ? true : false;
            this.isCompletedTheme = (res.themeId !== null) ? true : false;
        });
    }
}
