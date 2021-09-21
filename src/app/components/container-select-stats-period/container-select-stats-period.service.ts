import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Injectable()
export class ContainerSelectStatsPeriodService {
    form: FormGroup = this._formBuilder.group({});

    constructor(private _formBuilder: FormBuilder) { }

    /**
     * Buid the form
     * @param data The period data
     */
    buildForm(data: StatsPeriodData): void {
        this.form = this._formBuilder.group({
            startDate: [data.startDate, [Validators.required, ValidatorsHelper.date]],
            endDate: [data.endDate, [Validators.required, ValidatorsHelper.date]],
            periodId: [data.periodId, [Validators.required]],
        });
    }
}
