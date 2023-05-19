import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

import { ContainerSelectStatsPeriodService } from './container-select-stats-period.service';

declare var DatePickerPlugin: any;

@Component({
  selector: 'agt-container-select-stats-period',
  templateUrl: './container-select-stats-period.component.html',
  styles: [
  ],
  providers: [ContainerSelectStatsPeriodService]
})
export class ContainerSelectStatsPeriodComponent implements OnInit {
    @Input() statsPeriodData: StatsPeriodData | null = null;
    @Input() canShowComparisonPeriod: boolean = true;
    @Output() statsPeriodSelected: EventEmitter<StatsPeriodData> = new EventEmitter<StatsPeriodData>();
    calendarIdStartDate: string = 'startDate';
    calendarIdEndDate: string = 'endDate';
    private _isFormSubmitted: boolean = false;

    constructor(private _containerSelectStatsPeriodService: ContainerSelectStatsPeriodService) { }

    ngOnInit(): void {
        // If there is no period data
        if(this.statsPeriodData === null) {
            // Set default data
            this.statsPeriodData = {
                startDate: (moment().subtract(1, 'months')).add(1, 'days').format('DD/MM/YYYY'),
                endDate: moment().format('DD/MM/YYYY'),
                periodId: 1
            };
        }
        if(this.statsPeriodData) {
            this.model.buildForm(this.statsPeriodData);
        }
        this._initCalendars();
        this.selectPeriod();
    }

    get model(): ContainerSelectStatsPeriodService {
        return this._containerSelectStatsPeriodService;
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
     * Valid the form and emit the selected period
     */
    selectPeriod(): void {
        if(this.model.form.valid) {
            const data: StatsPeriodData = this.model.form.value;
            this.statsPeriodSelected.emit(data);
        }
    }

    /**
     * Initialize the calendars
     */
    private _initCalendars(): void {
        DatePickerPlugin.init();
        DatePickerPlugin.initElement(this.calendarIdStartDate, this._onChangeDate, this);
        DatePickerPlugin.initElement(this.calendarIdEndDate, this._onChangeDate, this);
    }

    /**
     * Event to update a date in the policy form
     * @param selectorId   The selector ID
     * @param changedValue The changed value
     * @param context      The app context
     */
    private _onChangeDate(selectorId: string, changedValue: string, context: ContainerSelectStatsPeriodComponent): void {
        context.model.form.patchValue({[selectorId]: changedValue});
    }

}
