import { Component, Input, OnInit } from '@angular/core';

import { ModalConfirmGoToAgenthosSupportService } from './modal-confirm-go-to-agenthos-support.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-go-to-agenthos-support',
  templateUrl: './modal-confirm-go-to-agenthos-support.component.html',
  styles: [
  ],
  providers: [
    ModalConfirmGoToAgenthosSupportService
  ]
})
export class ModalConfirmGoToAgenthosSupportComponent implements OnInit {
    @Input() modalId: string = '';

    constructor(public model: ModalConfirmGoToAgenthosSupportService) { }

    ngOnInit(): void {
        this.model.loadUsername();
        this.model.loadWorkspaceName();
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }

}
