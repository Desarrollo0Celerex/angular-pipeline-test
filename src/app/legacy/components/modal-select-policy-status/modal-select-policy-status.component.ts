import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ModalSelectPolicyStatusService } from './modal-select-policy-status.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-policy-status',
  templateUrl: './modal-select-policy-status.component.html',
  styles: [
  ]
})
export class ModalSelectPolicyStatusComponent implements OnChanges, OnInit {
    @Input() modalId: string;
    @Input() contentTypeName: string;
    @Input() contentSubtype: number;
    @Output() contentSubtypeNameSelected: EventEmitter<string>;

    constructor(public modalSelectPolicyTypeService: ModalSelectPolicyStatusService) {
        this.modalId = '';
        this.contentTypeName = '';
        this.contentSubtype = 0;
        this.contentSubtypeNameSelected = new EventEmitter<string>();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.contentSubtype !== 'undefined') {
            this._emitContentSubtypeName();
        }
    }

    ngOnInit(): void {
        this._loadPolicyStatus();
    }

    /**
     * Click event to select the quotation status
     * @param quotationStatusName The name of selected quotation status
     */
    onClickSelectPolicyStatus(quotationStatusName: string): void {
        this.contentSubtypeNameSelected.emit(quotationStatusName);
        ModalPlugin.hide(this.modalId);
    }

    /**
     * Emit the content subtype name
     */
    private _emitContentSubtypeName(): void {
        if(!!this.contentSubtype) {
            setTimeout(() => {
                const policyStatusName: string = this.modalSelectPolicyTypeService.getPolicyStatusName(this.contentSubtype);
                this.contentSubtypeNameSelected.emit(policyStatusName);
            }, 0);
        }
    }

    /**
     * Load the policy status
     * Emit the name of the selected quotation status;
     */
    private _loadPolicyStatus(): void {
        this.modalSelectPolicyTypeService.loadPolicyStatus().subscribe( () => {
            this._emitContentSubtypeName();
        });
    }

}
