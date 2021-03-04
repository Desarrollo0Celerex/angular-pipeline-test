import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ModalSelectQuotationStatusService } from './modal-select-quotation-status.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-quotation-status',
  templateUrl: './modal-select-quotation-status.component.html',
  styles: [
  ]
})
export class ModalSelectQuotationStatusComponent implements OnInit, OnChanges {
    @Input() modalId: string;
    @Input() contentTypeName: string;
    @Input() contentSubtype: number;
    @Output() contentSubtypeNameSelected: EventEmitter<string>;

    constructor(public modalSelectQuotationTypeService: ModalSelectQuotationStatusService) {
        this.modalId = '';
        this.contentTypeName = '';
        this.contentSubtype = 0;
        this.contentSubtypeNameSelected = new EventEmitter<string>();
    }

    ngOnInit(): void {
        this._loadQuotationStatus();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.contentSubtype !== 'undefined') {
            this._emitContentSubtypeName();
        }
    }

    /**
     * Click event to select the quotation status
     * @param quotationStatusName The name of selected quotation status
     */
    onClickSelectQuotationStatus(quotationStatusName: string): void {
        this.contentSubtypeNameSelected.emit(quotationStatusName);
        ModalPlugin.hide(this.modalId);
    }

    /**
     * Emit the content subtype name
     */
    private _emitContentSubtypeName(): void {
        if(!!this.contentSubtype) {
            setTimeout(() => {
                const quotationStatusName: string = this.modalSelectQuotationTypeService.getQuotationStatusName(this.contentSubtype);
                this.contentSubtypeNameSelected.emit(quotationStatusName);
            }, 0);
        }
    }

    /**
     * Load the quotation status
     * Emit the name of the selected quotation status;
     */
    private _loadQuotationStatus(): void {
        this.modalSelectQuotationTypeService.loadQuotationStatus().subscribe( () => {
            this._emitContentSubtypeName();
        });
    }

}
