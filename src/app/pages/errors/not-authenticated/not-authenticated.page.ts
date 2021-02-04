import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-not-authenticated',
  templateUrl: './not-authenticated.page.html',
  styles: [
  ]
})
export class NotAuthenticatedPage implements OnInit {
    ROUTES_NAME: any;

    constructor() {
        this.ROUTES_NAME = ROUTES_NAME;
    }

    ngOnInit(): void {
    }

}
