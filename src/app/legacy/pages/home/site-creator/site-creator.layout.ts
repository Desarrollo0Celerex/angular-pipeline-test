import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { SiteCreatorService } from './site-creator.service';

@Component({
    selector: 'agt-site-creator',
    templateUrl: './site-creator.layout.html',
    styles: [],
    standalone: false
})
export class SiteCreatorLayout implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(public model: SiteCreatorService) { }

    ngOnInit(): void {
      this.model.loadSiteCreatorStatus();
    }
}
