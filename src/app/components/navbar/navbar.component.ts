import { Component, AfterViewChecked } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ActivePlugin: any;

@Component({
  selector: 'agt-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements AfterViewChecked {
    ROUTES_NAME: any;

    constructor() {
        this.ROUTES_NAME = ROUTES_NAME;
    }

    ngAfterViewChecked(): void {
        ActivePlugin.init();
    }

}
