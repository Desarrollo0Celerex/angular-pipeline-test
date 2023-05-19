import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { WalletLayoutService } from './wallet-layout.service';

@Component({
  selector: 'agt-wallet',
  templateUrl: './wallet.layout.html',
  styles: [
  ],
  providers: [WalletLayoutService]
})
export class WalletLayout implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    walletId: string = '';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _walletLayoutService: WalletLayoutService
    ) { }

    ngOnInit(): void {
        this._catchParams();
    }

    get model(): WalletLayoutService {
        return this._walletLayoutService;
    }

    private _catchParams(): void {
        if(!!this._activatedRoute.firstChild) {
            this._activatedRoute.firstChild.paramMap.subscribe((res: any) => {
                this.walletId = res.get('walletId');
                this.model.loadWallet();
            });
        }
    }
}
