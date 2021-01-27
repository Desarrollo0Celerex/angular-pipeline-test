import { Component, OnInit } from '@angular/core';

import { ActivateWorkspaceService } from './activate-workspace.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-activate-workspace',
  templateUrl: './activate-workspace.page.html',
  styles: [
  ]
})
export class ActivateWorkspacePage implements OnInit {
    activateWorkspaceModalId: string;

    constructor(public activateWorkspaceService: ActivateWorkspaceService) {
        this.activateWorkspaceModalId = 'agt-modal-activate-workspace';
    }

    ngOnInit(): void {
        this.activateWorkspaceService.loadWorkspace();
    }

    /**
     * Click event to show the modal to activate workspace
     */
    onClickShowModalActivateWorkspace(): void {
        ModalPlugin.show(this.activateWorkspaceModalId);
    }

}
