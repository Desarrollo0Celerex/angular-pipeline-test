import { Component, Input, OnInit } from '@angular/core';

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

    constructor() {
        this.incompletePolicy = null;
    }

    ngOnInit(): void {
        PopoverPlugin.init();
    }

}
