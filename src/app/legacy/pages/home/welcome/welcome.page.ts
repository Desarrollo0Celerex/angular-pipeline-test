import { Component, OnInit } from '@angular/core';

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
    ROUTES_NAME: any = ROUTES_NAME;
    modalIdConfirmGoToAgenthosHub: string = 'agt-confirm-go-to-agenthos-hub';
    modalIdConfirmGoToAgenthosAcademy: string = 'agt-confirm-go-to-agenthos-academy';
    modalIdConfirmGoToAgenthosSupport: string = 'agt-confirm-go-to-agenthos-support';

    constructor(public model: WelcomeService) { }

    ngOnInit(): void {
        this.model.loadUser();
        this.model.loadContactCenterStatus();
        this.model.loadSocialConnectStatus();
        this.model.loadAppCreatorStatus();
        this.model.loadSiteCreatorStatus();
        this.model.loadLeadGeneratorStatus();
    }
    
    showModalToConfirmGoToAgenthosAcademy(): void {
        ModalPlugin.show(this.modalIdConfirmGoToAgenthosAcademy);
    }

    showModalToConfirmGoToAgenthosHub(): void {
        ModalPlugin.show(this.modalIdConfirmGoToAgenthosHub);
    }

    showModalToConfirmGoToAgenthosSupport(): void {
        ModalPlugin.show(this.modalIdConfirmGoToAgenthosSupport);
    }
}
