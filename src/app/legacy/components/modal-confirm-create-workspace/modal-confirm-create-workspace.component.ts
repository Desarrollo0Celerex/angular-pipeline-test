import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-create-workspace',
  templateUrl: './modal-confirm-create-workspace.component.html',
  styles: [
  ]
})
export class ModalConfirmCreateWorkspaceComponent {
    @Input() modalId: string = '';

    constructor(private router: Router) { }

    /**
     * Click event to navigate to create a workspace
     */
    goToCreateWorkspace(): void {
        ModalPlugin.hide(this.modalId);
        this.router.navigateByUrl(ROUTES_NAME.createWorkspace);
    }

}
