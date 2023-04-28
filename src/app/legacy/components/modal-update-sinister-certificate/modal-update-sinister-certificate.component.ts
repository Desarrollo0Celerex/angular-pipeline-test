import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ERROR_CODES } from '@constants/error-codes';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpError } from '@interfaces/http-error.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { LoadingService } from '@core/services/loading.service';

import { ModalUpdateSinisterCertificateService } from './modal-update-sinister-certificate.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-update-sinister-certificate',
    templateUrl: './modal-update-sinister-certificate.component.html',
    styles: [],
    providers: [ModalUpdateSinisterCertificateService],
})
export class ModalUpdateSinisterCertificateComponent implements OnChanges {
    @Input() certificate: string = '';
    @Input() modalId: string = '';
    @Input() policyNumber: string = '';
    @Input() sinisterData: SinisterDataSend | null = null;
    selectedInsuredPos: number = -1;
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ModalUpdateSinisterCertificateService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.certificate && !!changes.certificate.currentValue) {
            this.model.form.patchValue({
                certificate: changes.certificate.currentValue,
            });
        }
        if (!!this.sinisterData) {
            this.model
                .loadPolicyInsureds(
                    this.sinisterData.contactId,
                    this.sinisterData.policyId
                )
                .subscribe(() => {
                    this.calculateInsuredPos();
                });
        }
    }

    calculateInsuredPos(): void {
        this.selectedInsuredPos = this.model.calculateInsuredPos(
            this.model.f.certificate.value
        );
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    updatePolicySinisterCertificate(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid && !!this.sinisterData) {
            this._loadingService.show();
            this.model
                .updatePolicySinisterCertificate(this.sinisterData)
                .subscribe(
                    (policyInsuredId: string) => {
                        ModalPlugin.hide(this.modalId);
                        setTimeout(() => {
                            this._loadingService.hide();
                            AlertHelper.sinisterCertificateUpdated(
                                this._reloadPage,
                                this
                            );
                        }, 500);
                    },
                    (error: HttpError) => {
                        switch (error.error) {
                            case ERROR_CODES.sinisterCertificateNotFound:
                                this.model.f.certificate.setErrors({
                                    sinisterCertificateNotFound: true,
                                });
                                break;
                        }
                        this._loadingService.hide();
                    }
                );
        }
    }

    private _reloadPage(
        context: ModalUpdateSinisterCertificateComponent
    ): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        if (!!context.sinisterData) {
            context._router.navigate(
                [
                    '/' +
                        ROUTES_NAME.showSinisterHistory(
                            context.sinisterData.contactId,
                            context.sinisterData.policyId,
                            context.sinisterData.sinisterId
                        ),
                ],
                { relativeTo: context._activatedRoute }
            );
        }
    }
}
