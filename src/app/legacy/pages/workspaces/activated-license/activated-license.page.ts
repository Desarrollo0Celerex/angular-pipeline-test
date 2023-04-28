import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { UserTokenData } from '@core/interfaces/user-token-data.interface';
import { LoadingService } from '@core/services/loading.service';

import { ActivatedLicenseService } from './activated-license.service';

@Component({
    selector: 'agt-activated-license',
    templateUrl: './activated-license.page.html',
    styles: [],
    providers: [ActivatedLicenseService],
})
export class ActivatedLicensePage implements OnInit {
    constructor(
        private _loadingService: LoadingService,
        private _model: ActivatedLicenseService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.startTreal();
    }

    startTreal(): void {
        this._loadingService.show();
        this._model.activateWorkspace(null).subscribe((res: HttpResponse) => {
            const userTokenData: UserTokenData =
                this._model.startSessionInAgenthos(res.data);
            // Login to firebase
            this._model
                .getFirebaseToken(
                    userTokenData.workspaceId,
                    userTokenData.userId
                )
                .subscribe((res: string) => {
                    this._model
                        .startSessionInFirebase(res)
                        .then(() => {
                            this._loadingService.hide();
                            AlertHelper.trialStarted(this._goToDashboard, this);
                        })
                        .catch(() => {
                            this._loadingService.hide();
                            this._model.logout();
                        });
                });
        });
    }

    private _goToDashboard(context: any): void {
        context._router.navigateByUrl(ROUTES_NAME.workspaceWelcome);
    }
}
