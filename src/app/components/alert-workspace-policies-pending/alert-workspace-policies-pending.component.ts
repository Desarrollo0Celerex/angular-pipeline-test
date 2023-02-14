import { Component, OnInit } from '@angular/core';

import { AlertWorkspacePoliciesPendingService } from './alert-workspace-policies-pending.service';

@Component({
  selector: 'agt-alert-workspace-policies-pending',
  templateUrl: './alert-workspace-policies-pending.component.html',
  styles: [
  ],
  providers: [AlertWorkspacePoliciesPendingService]
})
export class AlertWorkspacePoliciesPendingComponent implements OnInit {

    constructor(public model: AlertWorkspacePoliciesPendingService) { }

    ngOnInit(): void {
        this.model.loadTotalWorkspacePoliciesPending();
    }

}
