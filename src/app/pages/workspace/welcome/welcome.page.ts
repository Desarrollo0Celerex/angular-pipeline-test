import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { WelcomeService } from './welcome.service';

@Component({
  selector: 'agt-welcome',
  templateUrl: './welcome.page.html',
  styles: [
  ]
})
export class WelcomePage implements OnInit {
    ROUTES_NAME: any;

    constructor(
        public welcomeService: WelcomeService,
        private router: Router
    ) {
        this.ROUTES_NAME = ROUTES_NAME;
    }

    ngOnInit(): void {
        this.welcomeService.uploadUser('AID20200521NZIYH');
    }

    /**
     * Navigate to create a workspace
     */
    onClickGoToCreateWorkspace(): void {
        this.router.navigateByUrl(ROUTES_NAME.CREATE_WORKSPACE);
    }

}
