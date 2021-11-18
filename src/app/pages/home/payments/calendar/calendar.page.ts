import { Component, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-calendar',
  templateUrl: './calendar.page.html',
  styles: [
  ]
})
export class CalendarPage implements OnInit {
    contentType: number = CONTENT_TYPES.PAYMENT.ID;
    contentTypeName: string = CONTENT_TYPES.PAYMENT.NAME;

    constructor() { }

    ngOnInit(): void {
    }

}
