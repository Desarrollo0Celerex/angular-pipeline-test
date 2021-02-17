import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ModalSelectQuotationStatusService } from './modal-select-quotation-status.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-quotation-status',
  templateUrl: './modal-select-quotation-status.component.html',
  styles: [
  ]
})
export class ModalSelectQuotationStatusComponent implements OnInit {
    @Input() modalId: string;
    @Input() contentSubtype: number;
    @Output() contentSubtypeNameSelected: EventEmitter<string>;

    constructor(public modalSelectQuotationTypeService: ModalSelectQuotationStatusService) {
        this.modalId = '';
        this.contentSubtype = 0;
        this.contentSubtypeNameSelected = new EventEmitter<string>();
    }

    ngOnInit(): void {
        this._loadQuotationStatus();
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
     * Load the quotation status
     * Emit the name of the selected quotation status;
     */
    private _loadQuotationStatus(): void {
        this.modalSelectQuotationTypeService.loadQuotationStatus().subscribe( () => {
            const quotationStatusName: string = this.modalSelectQuotationTypeService.getQuotationStatusName(this.contentSubtype);
            this.contentSubtypeNameSelected.emit(quotationStatusName);
        });
    }

}
