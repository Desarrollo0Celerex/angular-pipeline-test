import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { SidebarService } from './sidebar.service';

@Component({
  selector: 'agt-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

    constructor(
        public sidebarService: SidebarService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.sidebarService.loadWorkspace();
    }

    onClickGoInvitations(): void {
        this._router.navigateByUrl(ROUTES_NAME.listInvitations);
    }

}
