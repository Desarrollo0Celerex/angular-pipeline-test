import { Injectable } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SHORT_ALPHANUMERIC_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Insured } from '@interfaces/insured.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { UpdateSinisterCertificateDataSend } from '@interfaces/update-sinister-certificate-data-send.interface';
import { SinisterService } from '@services/sinister.service';
import { PolicyInsuredService } from '@services/policy-insured.service';

@Injectable()
export class ModalUpdateSinisterCertificateService {
    form: FormGroup = this._buildForm();
    insureds: Insured[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _policyInsuredService: PolicyInsuredService,
        private _sinisterService: SinisterService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    calculateInsuredPos(certificate: string): number {
        return this.insureds.findIndex(
            (element) => element.certificate === certificate
        );
    }

    loadPolicyInsureds(contactId: string, policyId: string): Observable<void> {
        const fields: string =
            'certificate,vehicleMaker,vehicleVersion,vehicleModel';
        const page: number = 1;
        const perPage: number = 10000;
        return this._policyInsuredService
            .getPolicyInsureds(contactId, policyId, fields, page, perPage)
            .pipe(
                tap((res: HttpResponse) => {
                    this.insureds = res.data.items;
                }),
                map(() => {})
            );
    }

    updatePolicySinisterCertificate(
        sinisterData: SinisterDataSend
    ): Observable<string> {
        const requestBody: UpdateSinisterCertificateDataSend = this.form.value;
        return this._sinisterService.updatePolicySinisterCertificate(
            sinisterData,
            requestBody
        );
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            certificate: [
                '',
                [
                    Validators.required,
                    Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN),
                    Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX),
                    ValidatorsHelper.alphanumeric,
                ],
            ],
        });
    }
}
