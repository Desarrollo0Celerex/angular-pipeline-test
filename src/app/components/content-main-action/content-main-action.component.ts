import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-content-main-action',
  templateUrl: './content-main-action.component.html',
  styles: [
  ]
})
export class ContentMainActionComponent implements OnInit {
    @Input() contentType: number;
    @Input() contentSubtype: number;
    @Output() contentSubtypeNameSelected: EventEmitter<string>;
    CONTENT_TYPES: any;
    selectContactTypeModalId: string;
    selectQuotationTypeModalId: string;

    constructor() {
        this.contentType = 0;
        this.contentSubtype = 0;
        this.contentSubtypeNameSelected = new EventEmitter<string>();
        this.CONTENT_TYPES = CONTENT_TYPES;
        this.selectContactTypeModalId = 'modal-select-contact-type';
        this.selectQuotationTypeModalId = 'modal-select-quotation-status';
    }

    ngOnInit(): void { }

    /**
     * Get the header title
     * @return The header title
     */
    getHeaderTitle(): string {
        let title: string = '';
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID: title = 'Nuevo Prospecto'; break;
            case CONTENT_TYPES.CONTACT_QUOTATION.ID: title = 'Historial Cotizaciones'; break;
        }
        return title;
    }

    /**
     * Get the button title
     * @return The button title
     */
    getButtonTitle(): string {
        let title: string = '';
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID: title = 'CREAR PROSPECTO'; break;
            case CONTENT_TYPES.CONTACT_QUOTATION.ID: title = 'EXPLORAR HISTORIAL'; break;
        }
        return title;
    }

    /**
     * Click event to do action
     */
    onClickDoAction(): void {
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID: ModalPlugin.show(this.selectContactTypeModalId); break;
            case CONTENT_TYPES.CONTACT_QUOTATION.ID: ModalPlugin.show(this.selectQuotationTypeModalId); break;
        }
    }

    /**
     * Event to catch the name of the selected content subtype
     * @param contentSubtypeName The name of the selected content subtype
     */
    onContentSubtypeNameSelected(contentSubtypeName: string): void {
        this.contentSubtypeNameSelected.emit(contentSubtypeName);
    }

}
