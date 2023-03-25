import { Injectable } from '@angular/core';

import { Wallet } from '@interfaces/wallet.interface';
import { WalletService } from '@services/wallet.service';

@Injectable()
export class LaunchService {
    wallet: Wallet | null = null;
    
    constructor(private _walletService: WalletService) { }

    loadWallet(): void {
        const fields: string = 'themeName,walletKey';
        this._walletService.getWallet(fields).subscribe((res: Wallet) => {
            this.wallet = res;
            this.wallet.link = 'https://wallet.agenthos.com/' + this.wallet.walletKey; 
        });
    }
}
