import { Component, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

import { CalendarService } from './calendar.service';

import * as moment from 'moment';

@Component({
  selector: 'agt-calendar',
  templateUrl: './calendar.page.html',
  styles: [
  ],
  providers: [CalendarService]
})
export class CalendarPage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    paymentDate: string = moment().format('YYYY-MM-DD');
    selectedDate: string = moment().format('DD/MM/YYYY');
    selectedDateMonthStart: string = moment().startOf('month').format('DD/MM/YYYY');
    selectedDateMonthEnd: string = moment().endOf('month').format('DD/MM/YYYY');

    constructor(private _calendarService: CalendarService) { }

    ngOnInit(): void {
        this.model.loadTotalPaymentsAmount(this.selectedDate);
        this.model.loadTotalPaymentsAmountByMonth(this.selectedDateMonthStart, this.selectedDateMonthEnd);
    }

    get model(): CalendarService {
        return this._calendarService;
    }

    loadPayments(date: any): void {
        this.paymentDate = date.format('YYYY-MM-DD');
        this._loadTotalPaymentsAmount(date);
        this._loadTotalPaymentsAmountByMonth(date);
    }

    private _loadTotalPaymentsAmount(date: any): void {
        this.selectedDate = date.format('DD/MM/YYYY');
        this.model.loadTotalPaymentsAmount(this.selectedDate);
    }

    private _loadTotalPaymentsAmountByMonth(date: any): void {
        const selectedDateMonthStartAux: string = date.startOf('month').format('DD/MM/YYYY');
        // If was selected a new month
        if(selectedDateMonthStartAux !== this.selectedDateMonthStart) {
            this.selectedDateMonthStart = selectedDateMonthStartAux;
            this.selectedDateMonthEnd = date.endOf('month').format('DD/MM/YYYY');
            this.model.loadTotalPaymentsAmountByMonth(this.selectedDateMonthStart, this.selectedDateMonthEnd);
        }
    }

}
