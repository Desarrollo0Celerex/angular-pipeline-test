import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-wallet',
  templateUrl: './wallet.layout.html',
  styles: [
  ]
})
export class WalletLayout implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    walletId: string = '';

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._catchParams();
    }

    private _catchParams(): void {
        if(!!this._activatedRoute.firstChild) {
            this._activatedRoute.firstChild.paramMap.subscribe((res: any) => {
                this.walletId = res.get('walletId');
            });
        }
    }
}
