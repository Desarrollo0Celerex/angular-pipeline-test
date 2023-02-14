import { Component, OnInit } from '@angular/core';

import { AlertWorkspacePoliciesIncompleteService } from './alert-workspace-policies-incomplete.service';

@Component({
  selector: 'agt-alert-workspace-policies-incomplete',
  templateUrl: './alert-workspace-policies-incomplete.component.html',
  styles: [
  ],
  providers: [AlertWorkspacePoliciesIncompleteService]
})
export class AlertWorkspacePoliciesIncompleteComponent implements OnInit {
    constructor(public model: AlertWorkspacePoliciesIncompleteService) { }

    ngOnInit(): void {
        this.model.loadTotalWorkspacePoliciesIncomplete();
    }

}
