import { Injectable } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Injectable()
export class ContainerSelectStatsPeriodService {
    form: UntypedFormGroup = this._formBuilder.group({});

    constructor(private _formBuilder: UntypedFormBuilder) {}

    /**
     * Buid the form
     * @param data The period data
     */
    buildForm(data: StatsPeriodData): void {
        this.form = this._formBuilder.group({
            startDate: [
                data.startDate,
                [Validators.required, ValidatorsHelper.date],
            ],
            endDate: [
                data.endDate,
                [Validators.required, ValidatorsHelper.date],
            ],
            periodId: [data.periodId, [Validators.required]],
        });
    }
}
