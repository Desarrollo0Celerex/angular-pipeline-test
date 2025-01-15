import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import { CalendarService } from './calendar.service';

import moment from 'moment';

@Component({
    selector: 'agt-calendar',
    templateUrl: './calendar.page.html',
    styles: [],
    providers: [CalendarService],
})
export class CalendarPage implements OnInit {
    CONTENT_TYPES: any = CONTENT_TYPES;
    canReloadContent: boolean = false;
    paymentDate: string = moment().format('YYYY-MM-DD');
    selectedDate: string = moment().format('DD/MM/YYYY');
    selectedDateMonthStart: string = moment()
        .startOf('month')
        .format('DD/MM/YYYY');
    selectedDateMonthEnd: string = moment().endOf('month').format('DD/MM/YYYY');
    pageUrl: string = '/'; //'/' + ROUTES_NAME.listPayments;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _calendarService: CalendarService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.model.loadTotalPaymentsAmount(this.selectedDate);
        this.model.loadTotalPaymentsAmountByMonth(
            this.selectedDateMonthStart,
            this.selectedDateMonthEnd
        );
    }

    get model(): CalendarService {
        return this._calendarService;
    }

    contentReloaded(): void {
        this.canReloadContent = false;
    }

    loadPayments(date: any): void {
        this.paymentDate = date.format('YYYY-MM-DD');
        this._loadTotalPaymentsAmount(date);
        this._loadTotalPaymentsAmountByMonth(date);
    }

    reloadContent(): void {
        this.canReloadContent = true;
        this.model.loadTotalPaymentsAmount(this.selectedDate);
        this.model.loadTotalPaymentsAmountByMonth(
            this.selectedDateMonthStart,
            this.selectedDateMonthEnd
        );
    }

    reloadPage(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        const url: string = this._router.url.split('?')[0];
        this._router.navigate([url], { relativeTo: this._activatedRoute });
    }

    private _loadTotalPaymentsAmount(date: any): void {
        this.selectedDate = date.format('DD/MM/YYYY');
        this.model.loadTotalPaymentsAmount(this.selectedDate);
    }

    private _loadTotalPaymentsAmountByMonth(date: any): void {
        const selectedDateMonthStartAux: string = date
            .startOf('month')
            .format('DD/MM/YYYY');
        // If was selected a new month
        if (selectedDateMonthStartAux !== this.selectedDateMonthStart) {
            this.selectedDateMonthStart = selectedDateMonthStartAux;
            this.selectedDateMonthEnd = date
                .endOf('month')
                .format('DD/MM/YYYY');
            this.model.loadTotalPaymentsAmountByMonth(
                this.selectedDateMonthStart,
                this.selectedDateMonthEnd
            );
        }
    }
}
