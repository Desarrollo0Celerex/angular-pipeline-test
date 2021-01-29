import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { ContainerShowWorkspaceInfoService } from './container-show-workspace-info.service';

@Component({
  selector: 'agt-container-show-workspace-info',
  templateUrl: './container-show-workspace-info.component.html',
  styles: [
  ]
})
export class ContainerShowWorkspaceInfoComponent implements OnInit {
    ROUTES_NAME: any;

    constructor(public containerShowWorkspaceInfoService: ContainerShowWorkspaceInfoService) {
        this.ROUTES_NAME = ROUTES_NAME;
    }

    ngOnInit(): void {
        this.containerShowWorkspaceInfoService.loadWorkspace();
    }

}
