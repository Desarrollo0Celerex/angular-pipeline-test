import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Site } from '@interfaces/site.interface';
import { LoadingService } from '@core/services/loading/loading.service';

declare var ModalPlugin: any;

import { ThemeService } from './theme.service';

@Component({
    selector: 'agt-theme',
    templateUrl: './theme.page.html',
    styles: [],
    providers: [ThemeService],
})
export class ThemePage implements OnInit {
    modalIdConfirmUpdateSite: string = 'agt-confirm-update-site';
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ThemeService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._loadSite();
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

    selectTheme(siteThemeId: number): void {
        this.model.selectTheme(siteThemeId);
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
                this._loadSiteThemes(site);
            },
            () => {
                this._loadSiteThemes();
            }
        );
    }

    private _loadSiteThemes(site: Site | null = null): void {
        this.model.loadSiteThemes().subscribe(() => {
            this.model.buildForm(site);
            this.model.selectTheme(parseInt(this.model.f.siteThemeId.value));
        });
    }
}
