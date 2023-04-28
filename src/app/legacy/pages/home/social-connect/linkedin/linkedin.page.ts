import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { LinkedinService } from './linkedin.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-linkedin',
  templateUrl: './linkedin.page.html',
  styles: [
  ],
  providers: [LinkedinService]
})
export class LinkedinPage implements OnInit {
    modalIdConfirmCreateLinkedinAccount: string = 'agt-confirm-create-linkedin-account';
    modalIdConfirmUpdateSocialConnect: string = 'agt-confirm-update-social-connect';
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: LinkedinService,
        private _loadingService: LoadingService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._loadWorkspace();
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    showModalToConfirmUpdateSocialConnect(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            ModalPlugin.show(this.modalIdConfirmUpdateSocialConnect);
        }
    }

    showModalToConfirmCreateLinkedinAccount(): void {
        ModalPlugin.show(this.modalIdConfirmCreateLinkedinAccount);
    }

    updateSocialConnect(): void {
        this._loadingService.show();
        this.model.updateLinkedinUrl().subscribe(() => {
            this._loadingService.hide();
            this._router.navigateByUrl(ROUTES_NAME.socialConnectResume);
            AlertHelper.socialConnectUpdated();
        })
    }

    private _loadWorkspace(): void {
        this.model.loadWorkspace().subscribe((res: HttpResponse) => {
            this.model.buildForm(res.data.linkedinUrl);
        })
    }

}
