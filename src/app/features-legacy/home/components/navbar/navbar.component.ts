import { AfterViewChecked, Component } from '@angular/core';

import { PAY_TRACKER_ROUTES, TASKS_ROUTES } from '@core/constants/routes';
import { ROUTES_NAME } from '@constants/routes-name';

declare var ActivePlugin: any;

@Component({
    selector: 'agt-navbar',
    templateUrl: './navbar.component.html',
    styles: [],
    standalone: false
})
export class NavbarComponent implements AfterViewChecked {
    ROUTES_NAME: any = ROUTES_NAME;
    calendarLink: string = `${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.CALENDAR}`;
    paymentsLink: string = `${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.PAYMENTS}`;
    tasksLink: string = `${TASKS_ROUTES.MODULE}/${TASKS_ROUTES.TASKS}`;
    tasksCalendarLink: string = `${TASKS_ROUTES.MODULE}/${TASKS_ROUTES.CALENDAR}`;

    ngAfterViewChecked(): void {
        ActivePlugin.init();
    }
}
