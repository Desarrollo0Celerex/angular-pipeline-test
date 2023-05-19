import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ModalSelectFileService {
    form: FormGroup = this._buildForm();

    constructor(private _formBuilder: FormBuilder) { }

    get f(): { [key: string]: AbstractControl; } {
        return this.form.controls;
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            file: ['', [Validators.required]]
        });
    }
}
