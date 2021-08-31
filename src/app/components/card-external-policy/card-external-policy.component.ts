import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExternalPolicy } from '@interfaces/external-policy.interface';

@Component({
  selector: 'agt-card-external-policy',
  templateUrl: './card-external-policy.component.html',
  styles: [
  ]
})
export class CardExternalPolicyComponent implements OnInit {
    @Input() externalPolicy: ExternalPolicy | null = null;
    @Output() showExternalPolicy: EventEmitter<string> = new EventEmitter<string>();
    @Output() confirmValidateExternalPolicy: EventEmitter<string> = new EventEmitter<string>();
    @Output() confirmUpdateExternalPolicy: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
    }

    confirmUpdatePolicy(): void {
        console.log('Confirm update pólicy')
    }

    _confirmUpdatePolicy(): void {
        if(!!this.externalPolicy) {
            if(!!this.externalPolicy.isChecked) {
                this.confirmUpdateExternalPolicy.emit(this.externalPolicy.externalPolicyId);
            } else {
                this.confirmValidateExternalPolicy.emit(this.externalPolicy.externalPolicyId);
            }
        }
    }

    _showExternalPolicy(): void {
        if(!!this.externalPolicy) this.showExternalPolicy.emit(this.externalPolicy.policyUrl)
    }
}
