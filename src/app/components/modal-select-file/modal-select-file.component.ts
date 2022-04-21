import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-file',
  templateUrl: './modal-select-file.component.html',
  styles: [
  ]
})
export class ModalSelectFileComponent implements OnChanges {
    @Input() modalId: string;
    @Input() data: ModalSelectFileData | null;
    @Output() fileSelected: EventEmitter<File>;
    @ViewChild('buttonUploadFile') buttonUploadFile: ElementRef<HTMLElement> | null;
    private _canShowPreview: boolean = true;
    private _maxFileSize: string = '2M';

    constructor() {
        this.modalId = '';
        this.data = null;
        this.fileSelected = new EventEmitter<File>();
        this.buttonUploadFile = null;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.data.currentValue) {
            DropifyPlugin.init(changes.data.currentValue.fileType, changes.data.currentValue.formats, this._canShowPreview, this._maxFileSize);
        }
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
            if(this._checkIfValidFile(file.name, this.data!.formats)) {
                this.fileSelected.emit(file);
                ModalPlugin.hide(this.modalId);
            }
        }
    }

    private _checkIfValidFile(fileName: string, fileFormats: string[]): boolean {
        const fileExtension: string = this._getFileExtension(fileName);
        const isValid: boolean = fileFormats.includes(fileExtension);
        return isValid;
    }

    private _getFileExtension(fileName: string): string {
        const index: number = fileName.lastIndexOf('.');
        return (index !== -1 ) ? fileName.substring(index + 1) : '';
    }

}
