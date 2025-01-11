import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { CALENDAR_RANGES } from '@core/constants/settings';
import { CalendarRange } from '@core/interfaces/calendar-range.interface';
import { ModuleService } from '@features-legacy/tasks/services/module.service';
import moment from 'moment';

@Component({
    selector: 'agt-calendar-settings',
    templateUrl: './calendar-settings.component.html',
    styles: [],
    standalone: false
})
export class CalendarSettingsComponent
    extends SmartComponent
    implements OnInit
{
    ranges = [
        CALENDAR_RANGES.LAST_90_DAYS,
        CALENDAR_RANGES.LAST_60_DAYS,
        CALENDAR_RANGES.LAST_30_DAYS,
        CALENDAR_RANGES.LAST_15_DAYS,
        CALENDAR_RANGES.LAST_7_DAYS,
        CALENDAR_RANGES.TODAY,
        CALENDAR_RANGES.NEXT_7_DAYS,
        CALENDAR_RANGES.NEXT_15_DAYS,
        CALENDAR_RANGES.NEXT_30_DAYS,
        CALENDAR_RANGES.NEXT_60_DAYS,
        CALENDAR_RANGES.NEXT_90_DAYS,
    ];
    rangeStart = '';
    rangeEnd = '';
    rangeSelected = 0;
    filterSelected = '';

    constructor(private _moduleService: ModuleService) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.calendarRange$
            .pipe(this.untilComponentDestroy())
            .subscribe((range) => {
                this.rangeStart = range.start;
                this.rangeEnd = range.end;
            });
    }

    changeCalendarDate(range: CalendarRange): void {
        this.rangeSelected = -1;
        this._moduleService.changeCalendarRange(range);
    }

    generateCalendarFilter(data: any): void {
        const filter = data.target.value;
        this._moduleService.changeCalendarFilter(filter);
    }

    generateCalendarRange(data: any): void {
        let days = parseInt(data.target.value);
        let range: CalendarRange;
        if (days === 0) {
            range = {
                start: moment().format('YYYY-MM-DD'),
                end: moment().format('YYYY-MM-DD'),
            };
        } else if (days < 0) {
            days *= -1;
            days--;
            range = {
                start: moment().subtract(days, 'days').format('YYYY-MM-DD'),
                end: moment().format('YYYY-MM-DD'),
            };
        } else {
            days--;
            range = {
                start: moment().format('YYYY-MM-DD'),
                end: moment().add(days, 'days').format('YYYY-MM-DD'),
            };
        }
        this._moduleService.changeCalendarRange(range);
    }
}
