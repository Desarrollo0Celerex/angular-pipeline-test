import { Component, OnInit } from '@angular/core';

import { WelcomeService } from './welcome.service';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-welcome',
  templateUrl: './welcome.page.html',
  styles: [
  ]
})
export class WelcomePage implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(public model: WelcomeService) { }

    ngOnInit(): void {
        this.model.loadContactCenterStatus();
        this.model.loadAppCreatorStatus();
        this.model.loadSiteCreatorStatus();
    }
}
