import { Component, ElementRef, EventEmitter, Input, OnChanges, SimpleChanges, Output, ViewChild } from '@angular/core';

import { ModalSelectFileData } from '@interfaces/modal-select-file-data.interface';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-select-evidence',
  templateUrl: './modal-select-evidence.component.html',
  styles: [
  ]
})
export class ModalSelectEvidenceComponent implements OnChanges {
    @Input() modalId: string;
    @Input() data: ModalSelectFileData | null;
    @Output() fileSelected: EventEmitter<File>;
    @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('buttonUploadFile') buttonUploadFile: ElementRef<HTMLInputElement> | null;

    constructor() {
        this.modalId = '';
        this.data = null;
        this.fileSelected = new EventEmitter<File>();
        this.buttonUploadFile = null;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.data.currentValue) {
            DropifyPlugin.init(changes.data.currentValue.formats);
        }
    }

    onClickCloseModal(): void {
        ModalPlugin.hide(this.modalId);
        this.modalClosed.emit();
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

    resetEvidenceValue(): void {
        if(!!this.data) {
            DropifyPlugin.reset();
            DropifyPlugin.init(this.data.formats);
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
