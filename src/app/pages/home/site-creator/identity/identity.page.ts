import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ERROR_CODES } from '@constants/error-codes';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpError } from '@interfaces/http-error.interface';
import { Site } from '@interfaces/site.interface';

import { LoadingService } from '@services/loading.service';

import { IdentityService } from './identity.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-identity',
  templateUrl: './identity.page.html',
  styles: [
  ],
  providers: [IdentityService]
})
export class IdentityPage implements OnInit {
    modalIdConfirmUpdateSite: string = 'modal-confirm-update-site';
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: IdentityService,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._loadSite();
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    showModalToConfirmUpdateSite(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            ModalPlugin.show(this.modalIdConfirmUpdateSite);
        }
    }

    updateSite(): void {
        this._loadingService.show();
        this.model.updateSite().subscribe(() => {
            this._loadingService.hide();
            this._router.navigateByUrl(ROUTES_NAME.appCreatorResume);
            AlertHelper.siteUpdated();
        });
    }

    private _loadSite(): void {
        this.model.loadSite().subscribe((site: Site) => {
            this.model.buildForm(site);
        },
        (error: HttpError) => {
            switch (error.error) {
              case ERROR_CODES.siteNotFound:
                  this.model.buildForm();
                break;
            }
        })
    }
}
