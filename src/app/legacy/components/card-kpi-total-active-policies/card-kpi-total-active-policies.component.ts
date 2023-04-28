import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { CardKpiTotalActivePoliciesService } from './card-kpi-total-active-policies.service';

@Component({
  selector: 'agt-card-kpi-total-active-policies',
  templateUrl: './card-kpi-total-active-policies.component.html',
  styles: [
  ],
  providers: [CardKpiTotalActivePoliciesService]
})
export class CardKpiTotalActivePoliciesComponent implements OnInit {
    @Output() uploadPolicyRequested: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private _cardKpiActivePoliciesService: CardKpiTotalActivePoliciesService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadTotalActivePolicies();
    }

    get model(): CardKpiTotalActivePoliciesService {
        return this._cardKpiActivePoliciesService;
    }

    uploadPolicy(): void {
        this.uploadPolicyRequested.emit();
    }

    goToListActivePoliciesByRange(): void {
        this._router.navigateByUrl(ROUTES_NAME.listActivePoliciesByRange)
    }

}
