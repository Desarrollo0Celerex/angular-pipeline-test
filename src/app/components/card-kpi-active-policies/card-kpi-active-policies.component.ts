import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';

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

    constructor(private _cardKpiActivePoliciesService: CardKpiActivePoliciesService) { }

    ngOnInit(): void {
        this.model.loadTotalActivePolicies();
    }

    get model(): CardKpiActivePoliciesService {
        return this._cardKpiActivePoliciesService;
    }

    uploadPolicy(): void {
        this.uploadPolicyRequested.emit();
    }

}
