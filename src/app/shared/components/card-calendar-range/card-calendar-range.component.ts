import {
    AfterContentInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { CalendarRange } from '@core/interfaces/calendar-range.interface';
import moment from 'moment';

@Component({
    selector: 'agt-card-calendar-range',
    templateUrl: './card-calendar-range.component.html',
    styles: [],
})
export class CardCalendarRangeComponent implements OnChanges {
    @Input() rangeStart = '';
    @Input() rangeEnd = '';
    @Output() dateChanged = new EventEmitter<CalendarRange>();
    dateRange!: DateRange<any>;

    ngOnChanges(changes: SimpleChanges): void {
        this.dateRange = new DateRange(
            moment(this.rangeStart),
            moment(this.rangeEnd)
        );
    }

    changeDate(date: any): void {
        this.dateRange = new DateRange(date, date);
        this.dateChanged.emit({
            start: date.format('YYYY-MM-DD'),
            end: date.format('YYYY-MM-DD'),
        });
    }
}
