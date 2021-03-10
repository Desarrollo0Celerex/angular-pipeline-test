import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { FILE_TYPES } from '@constants/global';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-upload-policy-endorsement',
  templateUrl: './modal-upload-policy-endorsement.component.html',
  styles: [
  ]
})
export class ModalUploadPolicyEndorsementComponent implements OnInit {
    @Input() modalId: string;
    @Output() fileSelected: EventEmitter<File>;
    @ViewChild('buttonUploadEndorsement') buttonUploadEndorsement: ElementRef<HTMLElement> | null;
    private _allowedFileTypes: string[];

    constructor() {
        this.modalId = '';
        this.fileSelected = new EventEmitter<File>();
        this.buttonUploadEndorsement = null;
        this._allowedFileTypes = ['pdf'];
    }

    ngOnInit(): void {
        DropifyPlugin.init(FILE_TYPES.DOCUMENT, this._allowedFileTypes);
    }

    /**
     * Click event to request upload endorsement
     */
    onClickUploadEndorsement(): void {
        if(!!this.buttonUploadEndorsement) {
            this.buttonUploadEndorsement.nativeElement.click();
        }
    }

    /**
     * Change event to catch the file selected
     * @param event The event lounched
     */
    onChangeFile(event: any): void {
        if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            this.fileSelected.emit(file);
            ModalPlugin.hide(this.modalId);
        }
    }

}
