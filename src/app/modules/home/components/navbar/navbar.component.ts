import { AfterViewChecked, Component } from '@angular/core';

import {
    PAY_TRACKER_ROUTES,
    TASK_PLANNER_ROUTES,
} from '@configs/routes.config';
import { ROUTES_NAME } from '@constants/routes-name';

declare var ActivePlugin: any;

@Component({
    selector: 'agt-navbar',
    templateUrl: './navbar.component.html',
    styles: [],
})
export class NavbarComponent implements AfterViewChecked {
    ROUTES_NAME: any = ROUTES_NAME;
    calendarLink: string = `${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.CALENDAR}`;
    paymentsLink: string = `${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.PAYMENTS}`;
    tasksLink: string = `${TASK_PLANNER_ROUTES.MODULE}/${TASK_PLANNER_ROUTES.TASKS}`;

    ngAfterViewChecked(): void {
        ActivePlugin.init();
    }
}
