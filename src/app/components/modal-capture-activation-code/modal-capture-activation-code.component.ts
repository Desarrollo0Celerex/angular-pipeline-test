import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { LoadingService } from '@services/loading.service';

import { ModalCaptureActivationCodeService } from './modal-capture-activation-code.service'
import { HttpResponse } from '@interfaces/http-response.interface';
import { UserTokenData } from '@interfaces/user-token-data.interface';
import { AlertHelper } from '@helpers/alert.helper';
import { ROUTES_NAME } from '@constants/routes-name';
import { HttpError } from '@interfaces/http-error.interface';
import { ERROR_CODES } from '@constants/error-codes';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-capture-activation-code',
  templateUrl: './modal-capture-activation-code.component.html',
  styles: [
  ],
  providers: [ModalCaptureActivationCodeService]
})
export class ModalCaptureActivationCodeComponent{
    @Input() modalId: string;
    private _isFormSubmitted: boolean;

    constructor(
        public model: ModalCaptureActivationCodeService,
        private _loadingService: LoadingService,
        private _router: Router,
    ) {
        this.modalId = '';
        this._isFormSubmitted = false;
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    activateWorkspace(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            ModalPlugin.hide(this.modalId);
            this._activateWorkspace(this.model.form.get('activationCode')!.value)
        }
    }

    private _activateWorkspace(activationCode: string): void {
        this._loadingService.show();
        this.model.activateWorkspace(activationCode).subscribe(( res: HttpResponse) => {
          const userTokenData: UserTokenData = this.model.startSessionInAgenthos(res.data);
            // Login to firebase
            this.model.getFirebaseToken(userTokenData.workspaceId, userTokenData.userId).subscribe( (res: HttpResponse) => {
              this.model.startSessionInFirebase(res.data).then( () => {
                  this._loadingService.hide();
                    AlertHelper.workspaceActivated(this._goToDashboard, this);
                }).catch(() => {
                    this._loadingService.hide();
                    this.model.logout();
                })
            });
        },
        (error: HttpError) => {
            switch (error.error) {
                case ERROR_CODES.invalidActivationCode:
                    AlertHelper.invalidActivationCode();
                    break;
            }
        })
    }

    private _goToDashboard(context: ModalCaptureActivationCodeComponent): void {
        context._router.navigateByUrl(ROUTES_NAME.workspaceWelcome);
    }

}
