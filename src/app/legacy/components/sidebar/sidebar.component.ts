import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { SidebarService } from './sidebar.service';

@Component({
  selector: 'agt-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(
        public sidebarService: SidebarService
    ) { }

    ngOnInit(): void {
        this.sidebarService.loadWorkspace();
    }

}
