import { Component, OnInit } from '@angular/core';
import { FILE_ALL_FORMATS, FILE_SIZES } from '@constants/global';
import {
    SelectSmallFileData,
    SelectSmallFileModalService,
} from './select-small-file-modal.service';
import { SmartComponent } from '@core/classes/smart-component';
import { FileHelper } from '@core/helpers/file.helper';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

@Component({
    selector: 'agt-select-small-file-modal',
    templateUrl: './select-small-file-modal.component.html',
    styles: [],
})
export class SelectSmallFileModalComponent
    extends SmartComponent
    implements OnInit
{
    title = '';
    description = '';
    buttonLabel = '';
    fileInputId = 'agt-file-input-select-small-file';
    maxFileSize = FILE_SIZES.SMALL;
    modalId = 'agt-select-small-file-modal';
    selectedFile: File | null = null;
    private _allowedFileExtensions?: string[] = FILE_ALL_FORMATS;
    private _defaultFile?: File | null = null;
    private _filePreviewUrl? = '';

    constructor(private _model: SelectSmallFileModalService) {
        super();
    }

    ngOnInit(): void {
        this._model.selectSmallFileModal$
            .pipe(this.untilComponentDestroy())
            .subscribe((data) => {
                this._initModal(data);
            });
    }

    closeModal(): void {
        this.selectedFile = null;
        ModalPlugin.hide(this.modalId);
        this._filePreviewUrl = '';
        DropifyPlugin.resetV3();
    }

    onChangeFile(event: any): void {
        if (event.target.files.length > 0 && this._allowedFileExtensions) {
            const file: File = event.target.files[0];
            if (
                FileHelper.checkIfValidFile(
                    file.name,
                    this._allowedFileExtensions
                )
            ) {
                this.selectedFile = file;
            }
        }
    }

    selectFile(): void {
        this._model.selectFile(this.selectedFile!);
        this.closeModal();
    }

    private _initModal(data: SelectSmallFileData): void {
        this.title = data.title;
        this.description = data.description;
        this.buttonLabel = data.buttonLabel;
        this._allowedFileExtensions = data.settings?.allowedFileExtensions;
        this._defaultFile = data.settings?.defaultFile;
        this._filePreviewUrl = data.settings?.filePreviewUrl;
        this._openModal();
    }

    private _openModal(): void {
        ModalPlugin.show(this.modalId);
        DropifyPlugin.initV3(
            this._allowedFileExtensions,
            this.maxFileSize,
            true,
            this._defaultFile,
            this._filePreviewUrl
        );
    }
}
