import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

import { ContactFile } from '@interfaces/contact-file.interface';
import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';
import * as moment from 'moment';

@Component({
  selector: 'agt-card-contact-file',
  templateUrl: './card-contact-file.component.html',
  styles: [
  ]
})
export class CardContactFileComponent implements OnInit, OnChanges  {
    @Input() contactFile: ContactFile | null = null;
    @Output() deleteContactFile: EventEmitter<ContactFileDataSend> = new EventEmitter<ContactFileDataSend>();
    @Output() onShowContactFileDetails: EventEmitter<ContactFileDataSend> = new EventEmitter<ContactFileDataSend>();
    @Output() transferContactFile: EventEmitter<ContactFileDataSend> = new EventEmitter<ContactFileDataSend>();
    @Output() updateContactFile: EventEmitter<ContactFileDataSend> = new EventEmitter<ContactFileDataSend>();

    daysRemaining: number | null = null;
    spanText: string = '';

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['contactFile'] && this.contactFile) {
            this._processContactFile();
        }
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

    getFileClass(fileExtension: string): string {
        switch (fileExtension?.toLowerCase()) {
            case 'pdf':
                return 'agt-file-pdf';
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'bmp':
                return 'agt-file-img';
            case 'xls':
            case 'xlsx':
            case 'csv':
                return 'agt-file-excel';
            case 'doc':
            case 'docx':
                return 'agt-file-doc';
            default:
                return 'agt-file-pdf';
        }
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

    /**
     * Process the contact file to get the days remaining and the span text
     * @returns
     */
    private _processContactFile(): void {
        if (!this.contactFile?.expiredDate) {
            this.daysRemaining = null;
            this.spanText = '';
            return;
        }

        const today = moment().startOf('day');
        const expirationDate = moment(this.contactFile.expiredDate).startOf('day');
        const diffDays = expirationDate.diff(today, 'days'); // Diferencia en días

        if (diffDays < 0) {
            // Expirado
            this.daysRemaining = Math.abs(diffDays); // Días desde que expiró
            this.spanText = 'Expiró';
        } else {
            // Aún vigente
            this.daysRemaining = diffDays; // Días restantes
            this.spanText = 'Restante';
        }
    }

}
