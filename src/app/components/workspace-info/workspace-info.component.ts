import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { WorkspaceInfoService } from './workspace-info.service';

@Component({
  selector: 'agt-workspace-info',
  templateUrl: './workspace-info.component.html',
  styles: [
  ]
})
export class WorkspaceInfoComponent implements OnInit {
    ROUTES_NAME: any;

    constructor(public WorkspaceInfoService: WorkspaceInfoService) {
        this.ROUTES_NAME = ROUTES_NAME;
    }

    ngOnInit(): void {
        this.WorkspaceInfoService.loadWorkspace();
    }

}
