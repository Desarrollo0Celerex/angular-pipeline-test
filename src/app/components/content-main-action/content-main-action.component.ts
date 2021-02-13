import { Component, Input, OnInit } from '@angular/core';

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
    selectContactTypeModalId: string;

    constructor() {
        this.contentType = 0;
        this.selectContactTypeModalId = 'modal-select-contact-type';
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
        }
        return title;
    }

    /**
     * Click event to do action
     */
    onClickDoAction(): void {
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID:
                ModalPlugin.show(this.selectContactTypeModalId);
                break;
        }
    }

}
