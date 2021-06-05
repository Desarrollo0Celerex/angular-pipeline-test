import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ContactFile } from '@interfaces/contact-file.interface';
import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';

@Component({
  selector: 'agt-card-contact-file',
  templateUrl: './card-contact-file.component.html',
  styles: [
  ]
})
export class CardContactFileComponent implements OnInit {
    @Input() contactFile: ContactFile | null = null;
    @Output() deleteContactFile: EventEmitter<ContactFileDataSend> = new EventEmitter<ContactFileDataSend>();
    @Output() onShowContactFileDetails: EventEmitter<ContactFileDataSend> = new EventEmitter<ContactFileDataSend>();
    @Output() transferContactFile: EventEmitter<ContactFileDataSend> = new EventEmitter<ContactFileDataSend>();
    @Output() updateContactFile: EventEmitter<ContactFileDataSend> = new EventEmitter<ContactFileDataSend>();

    constructor() { }

    ngOnInit(): void {
    }

    get fileIcon(): string {
        let fileIcon: string = '';
        if(!!this.contactFile) {
            switch (this.contactFile.fileExtension) {
                case 'pdf':
                    fileIcon = 'fa-file-text';
                    break;
                case 'png':
                case 'jpg':
                case 'jpeg':
                case 'gif':
                case 'bmp':
                    fileIcon = 'fa-image';
                    break;
                default:
                    fileIcon = 'fa-archive';
            }
        }
        return fileIcon;
    }

    /**
     * Click event to delete contact file
     */
    onClickDeleteFile(): void {
        if(!!this.contactFile){
            this.deleteContactFile.emit({
                contactId: this.contactFile.contactId,
                contactFileId: this.contactFile.contactFileId
            });
        }
    }

    /**
     * Click event to show the details
     */
    onClickShowDetails(): void {
        if(!!this.contactFile){
            this.onShowContactFileDetails.emit({
                contactId: this.contactFile.contactId,
                contactFileId: this.contactFile.contactFileId
            });
        }
    }

    /**
     * Click event to transfer the contact file
     */
    onClickTransferFile(): void {
        if(!!this.contactFile){
            this.transferContactFile.emit({
                contactId: this.contactFile.contactId,
                contactFileId: this.contactFile.contactFileId
            });
        }
    }

    /**
     * Click event to transfer the contact file
     */
    onClickUpdateFile(): void {
        if(!!this.contactFile){
            this.updateContactFile.emit({
                contactId: this.contactFile.contactId,
                contactFileId: this.contactFile.contactFileId
            });
        }
    }

}
