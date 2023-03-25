import { Component, OnInit, Input } from '@angular/core';

import { ModalUpgradeLicenseToProService } from './modal-upgrade-license-to-pro.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-upgrade-license-to-pro',
  templateUrl: './modal-upgrade-license-to-pro.component.html',
  styles: [
  ],
  providers: [ModalUpgradeLicenseToProService]
})
export class ModalUpgradeLicenseToProComponent implements OnInit {
    @Input() modalId: string = '';

    constructor(public model: ModalUpgradeLicenseToProService) { }

    ngOnInit(): void {
        this.model.loadUsername();
        this.model.loadWorkspaceName();
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
