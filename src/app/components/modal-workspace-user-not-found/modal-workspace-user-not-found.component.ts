import { Component, Input } from '@angular/core';

import { AuthService } from '@services/auth.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-workspace-user-not-found',
  templateUrl: './modal-workspace-user-not-found.component.html',
  styles: [
  ]
})
export class ModalWorkspaceUserNotFoundComponent {
    @Input() modalId: string = '';

    constructor(private _authService: AuthService) { }

    logout(): void {
        ModalPlugin.hide(this.modalId);
        this._authService.logout();
    }

}
