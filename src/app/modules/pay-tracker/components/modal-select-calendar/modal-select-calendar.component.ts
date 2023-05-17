import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CALENDARS } from '@configs/constants.config';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-select-calendar',
    templateUrl: './modal-select-calendar.component.html',
    styles: [],
})
export class ModalSelectCalendarComponent {
    @Input() modalId = '';
    @Output() calendarSelected = new EventEmitter<number>();
    CALENDARS: any = CALENDARS;

    selectCalendar(calendar: number): void {
        ModalPlugin.hide(this.modalId);
        this.calendarSelected.emit(calendar);
    }
}
