import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WalletResumeService } from './wallet-resume.service';

@Component({
  selector: 'agt-wallet-resume',
  templateUrl: './wallet-resume.page.html',
  styles: [
  ],
  providers: [WalletResumeService]
})
export class WalletResumePage implements OnInit {
    walletId: string = '';
    themeColors: any[] = [
        { themeId: 1, background: 'bg-azure', preview: 'azure' },
        { themeId: 2, background: 'bg-indigo', preview: 'indigo' },
        { themeId: 3, background: 'bg-red', preview: 'red' },
        { themeId: 4, background: 'bg-orange', preview: 'orange' },
        { themeId: 5, background: 'bg-yellow', preview: 'yellow' },
        { themeId: 6, background: 'bg-lime', preview: 'lime' },
        { themeId: 7, background: 'bg-green', preview: 'green' },
        { themeId: 8, background: 'bg-teal', preview: 'teal' },
        { themeId: 9, background: 'bg-blue-dark', preview: 'blue-dark' }
    ];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _walletResumeService: WalletResumeService
    ) { }

    ngOnInit(): void {
        this._catchParams();
        this.model.loadWallet();
    }

    get model(): WalletResumeService {
        return this._walletResumeService;
    }

    private _catchParams(): void {
        this.walletId = this._activatedRoute.snapshot.params.walletId;
    }

}
