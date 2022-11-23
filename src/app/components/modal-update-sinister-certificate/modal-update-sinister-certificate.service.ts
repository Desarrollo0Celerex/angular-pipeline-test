import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SHORT_ALPHANUMERIC_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { Insured } from '@interfaces/insured.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { UpdateSinisterCertificateDataSend } from '@interfaces/update-sinister-certificate-data-send.interface';
import { SinisterService } from '@services/sinister.service';
import { PolicyInsuredService } from '@services/policy-insured.service';
import { element } from 'protractor';

@Injectable()
export class ModalUpdateSinisterCertificateService {
    form: FormGroup = this._buildForm();
    insureds: Insured[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _policyInsuredService: PolicyInsuredService,
        private _sinisterService: SinisterService
    ) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.form.controls;
    }

    calculateInsuredPos(vehicleNumber: string): number {
        return this.insureds.findIndex(element => element.vehicleNumber === vehicleNumber);
    }

    loadPolicyInsureds(contactId: string, policyId: string): Observable<void> {
        const fields: string = 'vehicleNumber,vehicleMaker,vehicleVersion,vehicleModel';
        return this._policyInsuredService.getPolicyInsureds(contactId, policyId, fields).pipe(
            tap((res: Insured[]) => {
                this.insureds = res;
            }),
            map(() => { }),
        )
    }

    updatePolicySinisterCertificate(sinisterData: SinisterDataSend): Observable<string> {
        const requestBody: UpdateSinisterCertificateDataSend = this.form.value;
        return this._sinisterService.updatePolicySinisterCertificate(sinisterData, requestBody);
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            certificate: ['', [Validators.required, Validators.minLength(SHORT_ALPHANUMERIC_LENGTH.MIN), Validators.maxLength(SHORT_ALPHANUMERIC_LENGTH.MAX), ValidatorsHelper.alphanumeric]]
        });
    }
}
