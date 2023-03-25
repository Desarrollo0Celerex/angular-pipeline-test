import { Injectable } from '@angular/core';

import { Wallet } from '@interfaces/wallet.interface';
import { WalletService } from '@services/wallet.service';

@Injectable()
export class AppCreatorService {
    appCreatorIsCompleted: boolean = false;

    constructor(private _walletService: WalletService) { }

    loadAppCreatorStatus(): void {
        const fields: string = 'name,iconsUrl,themeId';
        this._walletService.getWallet(fields).subscribe((res: Wallet) => {
            this.appCreatorIsCompleted = (res.name !== null && res.iconsUrl !== null && res.themeId !== null) ? true : false;
        });
    }
}
