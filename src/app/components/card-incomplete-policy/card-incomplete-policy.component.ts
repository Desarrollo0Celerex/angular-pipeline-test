import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PolicyPreview } from '@interfaces/policy-preview.interface';

declare var PopoverPlugin: any;

@Component({
  selector: 'agt-card-incomplete-policy',
  templateUrl: './card-incomplete-policy.component.html',
  styles: [
  ]
})
export class CardIncompletePolicyComponent implements OnInit {
    @Input() incompletePolicy: PolicyPreview | null;
    @Output() completePolicy: EventEmitter<string>;
    @Output() deletePolicy: EventEmitter<string>;
    @Output() showHistoryPolicy: EventEmitter<string>;

    constructor() {
        this.incompletePolicy = null;
        this.completePolicy = new EventEmitter<string>();
        this.deletePolicy = new EventEmitter<string>();
        this.showHistoryPolicy = new EventEmitter<string>();
    }

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    /**
     * Click event to request complete the policy
     */
    onClickCompletePolicy(): void {
        if(!!this.incompletePolicy) {
            this.completePolicy.emit(this.incompletePolicy.policyId);
        }
    }

    /**
     * Click event to request delete the policy
     */
    onClickDeletePolicy(): void {
        if(!!this.incompletePolicy) {
            this.deletePolicy.emit(this.incompletePolicy.policyId);
        }
    }

    /**
     * Click event to show the history policcy
     */
    onClickShowHistoryPolicy(): void {
        if(!!this.incompletePolicy) this.showHistoryPolicy.emit(this.incompletePolicy.policyId);
    }

}
