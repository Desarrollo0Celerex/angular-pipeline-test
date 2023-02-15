import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { environment } from '@env/environment';

import { HeaderService } from './header.service';

declare var ParticlesPlugin: any;
declare var ScreenPlugin: any;

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

    showFullScreen(): void {
        ScreenPlugin.showFullScreen();
    }

}
