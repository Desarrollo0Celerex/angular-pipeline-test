import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WalletService } from '@services/wallet.service';

@Injectable()
export class CreateWalletService {

    constructor(private _walletService: WalletService) { }

    createWallet(): Observable<string> {
        return this._walletService.createWallet();
    }
}
