import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Site } from '@interfaces/site.interface';

import { LoadingService } from '@core/services/loading.service';

import { IdentityService } from './identity.service';
import { LICENSES } from '@constants/global';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-identity',
    templateUrl: './identity.page.html',
    styles: [],
    providers: [IdentityService],
})
export class IdentityPage implements OnInit {
    modalIdConfirmUpdateSite: string = 'modal-confirm-update-site';
    modalIdUpgradeLicense: string = 'modal-upgrade-license';
    licenseName: string = LICENSES.PRO.NAME;
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: IdentityService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.model.loadWorkspaceLicenseId().subscribe(() => {
            this._loadSite();
        });
    }

    get themeName(): string {
        return this.model.site !== null &&
            this.model.site.siteThemeName !== null
            ? this.model.site.siteThemeName
            : '';
    }

    checkCanShowContainerEditDomain(): void {
        this.model.checkCanShowContainerEditDomain();
    }

    checkCanShowContainerShowCertificate(): void {
        this.model.checkCanShowContainerShowCertificate();
    }

    checkDomainInputStatus(): void {
        this.model.checkDomainInputStatus();
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

    showModalToConfirmUpdateSite(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            ModalPlugin.show(this.modalIdConfirmUpdateSite);
        }
    }

    showModalToUpgradeLicense(): void {
        ModalPlugin.show(this.modalIdUpgradeLicense);
    }

    updateSite(): void {
        this._loadingService.show();
        this.model.updateSite().subscribe(() => {
            this._loadingService.hide();
            this._router.navigateByUrl(ROUTES_NAME.siteCreatorResume);
            AlertHelper.siteUpdated();
        });
    }

    private _loadSite(): void {
        this.model.loadSite().subscribe(
            (site: Site) => {
                this.model.buildForm(site);
            },
            () => {
                this.model.buildForm();
            }
        );
    }
}
