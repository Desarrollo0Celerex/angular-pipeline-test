import { Component, OnInit, Input } from '@angular/core';

import { ModalUpgradeLicenseService } from './modal-upgrade-license.service';
import { environment } from '@env/environment';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-upgrade-license',
    templateUrl: './modal-upgrade-license.component.html',
    styles: [],
    providers: [ModalUpgradeLicenseService],
    standalone: false
})
export class ModalUpgradeLicenseComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() licenseName: string = '';
    agenthosSupportPhone =
        environment.agenthos.support.phoneCode +
        environment.agenthos.support.phoneNumber;

    constructor(public model: ModalUpgradeLicenseService) {}

    ngOnInit(): void {
        this.model.loadUsername();
        this.model.loadWorkspaceName();
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
