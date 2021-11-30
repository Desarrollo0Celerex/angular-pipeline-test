import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { WelcomeService } from './welcome.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-welcome',
  templateUrl: './welcome.page.html',
  styles: [
  ]
})
export class WelcomePage implements OnInit {
    ROUTES_NAME: any;
    modalIdConfirmCreateWorkspace: string = 'agt-confirm-create-workspace';

    constructor(
        public welcomeService: WelcomeService,
        private router: Router
    ) {
        this.ROUTES_NAME = ROUTES_NAME;
    }

    ngOnInit(): void {
        this.welcomeService.loadUser();
    }

    showModalToConfirmCreateWorkspace(): void {
        ModalPlugin.show(this.modalIdConfirmCreateWorkspace);
    }

}
