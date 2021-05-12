import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { HeaderService } from './header.service';

declare var ParticlesPlugin: any;

@Component({
  selector: 'agt-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
    ROUTES_NAME: any;

    constructor(
        public headerService: HeaderService
    ) {
        this.ROUTES_NAME = ROUTES_NAME;
    }

    ngOnInit(): void {
        ParticlesPlugin.init();
        this.headerService.loadUser();
    }

    /**
     * Click event to logout
     */
    onClickLogout(): void {
        this.headerService.logout();
    }

}
