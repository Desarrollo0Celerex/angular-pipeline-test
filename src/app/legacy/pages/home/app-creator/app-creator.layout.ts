import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { AppCreatorService } from './app-creator.service';

@Component({
    selector: 'agt-app-creator',
    templateUrl: './app-creator.layout.html',
    styles: [],
    providers: [AppCreatorService],
    standalone: false
})
export class AppCreatorLayout implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(public model: AppCreatorService) { }

    ngOnInit(): void {
        this.model.loadAppCreatorStatus();
    }
}
