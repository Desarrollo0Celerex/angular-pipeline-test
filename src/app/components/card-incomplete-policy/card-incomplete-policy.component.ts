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
    @Output() cancelPolicy: EventEmitter<string>;
    @Output() completePolicy: EventEmitter<string>;

    constructor() {
        this.incompletePolicy = null;
        this.cancelPolicy = new EventEmitter<string>();
        this.completePolicy = new EventEmitter<string>();
    }

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    /**
     * Click event to request cancel policy
     */
    onClickCancelPolicy(): void {
        if(!!this.incompletePolicy) {
            this.cancelPolicy.emit(this.incompletePolicy.policyId);
        }
    }

    /**
     * Click event to request complete policy
     */
    onClickCompletePolicy(): void {
        if(!!this.incompletePolicy) {
            this.completePolicy.emit(this.incompletePolicy.policyId);
        }
    }

}
