import { Component, OnInit, Input } from '@angular/core';

import { ModalUpgradeLicenseService } from './modal-upgrade-license.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-upgrade-license',
  templateUrl: './modal-upgrade-license.component.html',
  styles: [
  ],
  providers: [ModalUpgradeLicenseService]
})
export class ModalUpgradeLicenseComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() licenseName: string = '';

    constructor(public model: ModalUpgradeLicenseService) { }

    ngOnInit(): void {
        this.model.loadUsername();
        this.model.loadWorkspaceName();
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
