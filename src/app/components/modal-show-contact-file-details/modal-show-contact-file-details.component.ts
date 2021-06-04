import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';

import { ModalShowContactFileDetailsService } from './modal-show-contact-file-details.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-show-contact-file-details',
  templateUrl: './modal-show-contact-file-details.component.html',
  styles: [
  ],
  providers: [ModalShowContactFileDetailsService]
})
export class ModalShowContactFileDetailsComponent implements OnInit, OnChanges {
    @Input() modalId: string = '';
    @Input() contactFileData: ContactFileDataSend | null = null;
    @Output() transferContactFile: EventEmitter<ContactFileDataSend> = new EventEmitter<ContactFileDataSend>();

    constructor(public modalShowContactFileDetailsService: ModalShowContactFileDetailsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactFileData && !!changes.contactFileData.currentValue) {
            this._loadContactFile(changes.contactFileData.currentValue);
        }
    }

    ngOnInit(): void {
    }

    /**
     * Click event to transfer the contact file
     */
    onClickTransferFile(): void {
        if(!!this.contactFileData) {
            ModalPlugin.hide(this.modalId);
            this.transferContactFile.emit(this.contactFileData);
        }
    }

    /**
     * Load the contact file
     * @param contactFileData The contact file data
     */
    private _loadContactFile(contactFileData: ContactFileDataSend): void {
        this.modalShowContactFileDetailsService.loadContactFile(contactFileData);
    }

}
