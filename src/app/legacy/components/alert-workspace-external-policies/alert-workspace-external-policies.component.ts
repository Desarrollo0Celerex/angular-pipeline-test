import { Component, OnInit } from '@angular/core';

import { AlertWorkspaceExternalPoliciesService } from './alert-workspace-external-policies.service';

@Component({
    selector: 'agt-alert-workspace-external-policies',
    templateUrl: './alert-workspace-external-policies.component.html',
    styles: [],
    providers: [AlertWorkspaceExternalPoliciesService],
    standalone: false
})
export class AlertWorkspaceExternalPoliciesComponent implements OnInit {

    constructor(public model: AlertWorkspaceExternalPoliciesService) { }

    ngOnInit(): void {
        this.model.loadTotalWorkspaceExternalPolicies();
    }

}
