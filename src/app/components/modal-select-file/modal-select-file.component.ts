import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { FILE_TYPES } from '@constants/global';
import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-file',
  templateUrl: './modal-select-file.component.html',
  styles: [
  ]
})
export class ModalSelectFileComponent implements OnInit {
    @Input() modalId: string;
    @Input() data: ModalSelectFileData;
    @Output() fileSelected: EventEmitter<File>;
    @ViewChild('buttonUploadFile') buttonUploadFile: ElementRef<HTMLElement> | null;
    private _allowedFileTypes: string[];

    constructor() {
        this.modalId = '';
        this.data = {
            title: '',
            description: '',
            buttonLabel: ''
        }
        this.fileSelected = new EventEmitter<File>();
        this.buttonUploadFile = null;
        this._allowedFileTypes = ['pdf'];
    }

    ngOnInit(): void {
        DropifyPlugin.init(FILE_TYPES.DOCUMENT, this._allowedFileTypes);
    }

    /**
     * Click event to request upload endorsement
     */
    onClickUploadEndorsement(): void {
        if(!!this.buttonUploadFile) {
            this.buttonUploadFile.nativeElement.click();
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
