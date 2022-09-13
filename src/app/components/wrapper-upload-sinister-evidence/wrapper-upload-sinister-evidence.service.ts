import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterService } from '@services/sinister.service';

@Injectable()
export class WrapperUploadSinisterEvidenceService {
    form: FormGroup = this._buildForm();

    constructor(
        private _formBuilder: FormBuilder,
        private _sinisterService: SinisterService
    ) { }

    get f(): { [key: string]: AbstractControl; }  {
        return this.form.controls;
    }

    updateSinisterEvidence(sinisterData: SinisterDataSend): Observable<string> {
        const requestBody: FormData = new FormData();
        requestBody.append('evidenceFile', this.f.evidenceFile.value);
        return this._sinisterService.updatePolicySinisterEvidence(sinisterData, requestBody);
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            evidenceFile: ['', [Validators.required]]
        });
    }
}
