import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { LaunchAppService } from './launch-app.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-launch-app',
    templateUrl: './launch-app.page.html',
    styles: [],
    providers: [LaunchAppService],
    standalone: false
})
export class LaunchAppPage implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;
    walletId: string = '';
    modalIdConfirmShareApp: string = 'modal-confirm-share-app';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _launchAppService: LaunchAppService
    ) { }

    ngOnInit(): void {
        this._catchParams();
        this.model.loadWallet();
    }

    get model(): LaunchAppService {
        return this._launchAppService;
    }

    confirmShareApp(): void {
        ModalPlugin.show(this.modalIdConfirmShareApp);
    }

    private _catchParams(): void {
        this.walletId = this._activatedRoute.snapshot.params.walletId;
    }

}
