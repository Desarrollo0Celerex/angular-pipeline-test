import { Injectable } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { FILE_NAME_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterEvidenceType } from '@interfaces/sinister-evidence-type.interface';
import { SinisterEvidenceService } from '@services/sinister-evidence.service';
import { SinisterEvidenceTypeService } from '@services/sinister-evidence-type.service';

@Injectable()
export class ModalUploadSinisterEvidenceService {
    sinisterEvidenceTypes: SinisterEvidenceType[] = [];
    form: FormGroup = this._buildForm();

    constructor(
        private _formBuilder: FormBuilder,
        private _sinisterEvidenceService: SinisterEvidenceService,
        private _sinisterEvidenceTypeService: SinisterEvidenceTypeService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    loadSinisterEvidenceTypes(): void {
        const fields: string = '';
        this._sinisterEvidenceTypeService
            .getSinisterEvidenceTypes(fields)
            .subscribe((res: SinisterEvidenceType[]) => {
                this.sinisterEvidenceTypes = res;
            });
    }

    uploadSinisterEvidence(sinisterData: SinisterDataSend): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._sinisterEvidenceService.uploadSinisterEvidence(
            sinisterData,
            requestBody
        );
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            evidenceFile: ['', [Validators.required]],
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(FILE_NAME_LENGTH.MIN),
                    Validators.maxLength(FILE_NAME_LENGTH.MAX),
                    ValidatorsHelper.fileName,
                ],
            ],
            sinisterEvidenceTypeId: ['', [Validators.required]],
        });
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        requestBody.append('name', this.f.name.value);
        requestBody.append(
            'sinisterEvidenceTypeId',
            this.f.sinisterEvidenceTypeId.value
        );
        return requestBody;
    }
}
