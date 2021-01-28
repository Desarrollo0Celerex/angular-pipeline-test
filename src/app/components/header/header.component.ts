import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
        public headerService: HeaderService,
        private _router: Router
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
        this._router.navigateByUrl(ROUTES_NAME.notAuthenticated);
    }

}
