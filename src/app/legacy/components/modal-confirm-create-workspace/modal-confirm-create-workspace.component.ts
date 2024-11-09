import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { StorageService } from '@core/services/storage/storage.service';
import { environment } from '@env/environment';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-create-workspace',
    templateUrl: './modal-confirm-create-workspace.component.html',
    styles: [],
})
export class ModalConfirmCreateWorkspaceComponent {
    @Input() modalId: string = '';

    constructor(
        private router: Router,
        private _storageService: StorageService
    ) {}

    goToAssitant(activationCode: string = ''): void {
        let redirectUrl = `${environment.assistantUrl}/auth`;
        const userToken = this._storageService.getUserToken();
        if (userToken === null) {
            console.log('No hay token de usuario!');
            return;
        }
        redirectUrl += `?userToken=${userToken}`;
        if (activationCode) {
            redirectUrl += `&activationCode=${activationCode}`;
        }
        window.location.href = redirectUrl;
    }

    /**
     * Click event to navigate to create a workspace
     */
    goToCreateWorkspace(): void {
        ModalPlugin.hide(this.modalId);
        this.router.navigateByUrl(ROUTES_NAME.createWorkspace);
    }
}
