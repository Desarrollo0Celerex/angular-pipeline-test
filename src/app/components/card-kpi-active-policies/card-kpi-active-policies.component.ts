import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiActivePoliciesService } from './card-kpi-active-policies.service';

@Component({
  selector: 'agt-card-kpi-active-policies',
  templateUrl: './card-kpi-active-policies.component.html',
  styles: [
  ],
  providers: [CardKpiActivePoliciesService]
})
export class CardKpiActivePoliciesComponent implements OnInit {
    @Output() uploadPolicyRequested: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private _cardKpiActivePoliciesService: CardKpiActivePoliciesService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalActivePolicies();
    }

    get model(): CardKpiActivePoliciesService {
        return this._cardKpiActivePoliciesService;
    }

    uploadPolicy(): void {
        this.uploadPolicyRequested.emit();
    }

    goToListActivePoliciesByRange(): void {
        this._router.navigateByUrl(ROUTES_NAME.listActivePoliciesByRange)
    }

}
