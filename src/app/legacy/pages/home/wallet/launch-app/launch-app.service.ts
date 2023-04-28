import { Injectable } from '@angular/core';

import { Wallet } from '@interfaces/wallet.interface';
import { WalletService } from '@services/wallet.service';

@Injectable()
export class LaunchAppService {
    wallet: Wallet | null = null;

    constructor(private _walletService: WalletService) { }

    loadWallet(): void {
        const fields: string = 'walletKey,name,themeId,iconsUrl,createdAt,updatedAt,coveragesPhoneNumberWhatsapp';
        this._walletService.getWallet(fields).subscribe((res: Wallet) => {
            this.wallet = res;
        })
    }
}
