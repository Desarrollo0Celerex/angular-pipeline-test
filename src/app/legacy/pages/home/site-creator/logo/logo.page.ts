import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Site } from '@interfaces/site.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { LogoService } from './logo.service';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-logo',
    templateUrl: './logo.page.html',
    styles: [],
    providers: [LogoService],
})
export class LogoPage implements OnInit {
    logoUrl: string = '';
    modalIdConfirmUpdateSite: string = 'agt-confirm-update-site';
    private _allowedFileTypes: string[] = ['png', 'jpg', 'jpeg'];
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: LogoService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._loadSite();
    }

    get themeName(): string {
        return this.model.siteThemeName !== null
            ? this.model.siteThemeName
            : '';
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        const validationClass: string = InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
        if (constrolName === 'logo') {
            return validationClass === 'is-valid'
                ? 'agt-is-valid'
                : validationClass === 'is-invalid'
                ? 'agt-is-invalid'
                : '';
        }
        return validationClass;
    }

    selectLogo(event: any) {
        if (event.target.files.length > 0) {
            const logo = event.target.files[0];
            this.model.form.patchValue({ logo });
        }
    }

    showModalToConfirmUpdateSite(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            ModalPlugin.show(this.modalIdConfirmUpdateSite);
        }
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
                this.logoUrl = !!site.logoUrl ? site.logoUrl : '';
                this.model.buildForm();
                setTimeout(() => {
                    DropifyPlugin.init(this._allowedFileTypes);
                }, 0);
            },
            () => {
                this.model.buildForm();
                setTimeout(() => {
                    DropifyPlugin.init(this._allowedFileTypes);
                }, 0);
            }
        );
    }
}
