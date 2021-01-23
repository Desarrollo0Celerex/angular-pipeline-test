import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CheckWorkspaceStatusService } from './check-workspace-status.service';

@Component({
  selector: 'agt-check-workspace-status',
  template: '',
  styles: [
  ]
})
export class CheckWorkspaceStatusPage implements OnInit {

    constructor(
        private _checkWorkspaceStatusService: CheckWorkspaceStatusService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        if(this._checkWorkspaceStatusService.checkHasWorkspace()) {
            // TODO: Solicitar el estatus actual del ET y evaluarlo
        } else {
            this._router.navigateByUrl(ROUTES_NAME.WELCOME);
        }
    }

}
