import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { TiktokService } from './tiktok.service';
import { Workspace } from '@core/interfaces/workspace.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-tiktok',
    templateUrl: './tiktok.page.html',
    styles: [],
    providers: [TiktokService],
    standalone: false
})
export class TiktokPage implements OnInit {
    modalIdConfirmCreateTwitterAccount: string =
        'agt-confirm-create-twitter-account';
    modalIdConfirmUpdateSocialConnect: string =
        'agt-confirm-update-social-connect';
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: TiktokService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._loadWorkspace();
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    showModalToConfirmUpdateSocialConnect(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            ModalPlugin.show(this.modalIdConfirmUpdateSocialConnect);
        }
    }

    showModalToConfirmCreateTwitterAccount(): void {
        ModalPlugin.show(this.modalIdConfirmCreateTwitterAccount);
    }

    updateSocialConnect(): void {
        this._loadingService.show();
        this.model.updateTiktokUrl().subscribe(() => {
            this._loadingService.hide();
            this._router.navigateByUrl(ROUTES_NAME.socialConnectResume);
            AlertHelper.socialConnectUpdated();
        });
    }

    private _loadWorkspace(): void {
        this.model.loadWorkspace().subscribe((res: Workspace) => {
            this.model.buildForm(res.tiktokUrl);
        });
    }
}
