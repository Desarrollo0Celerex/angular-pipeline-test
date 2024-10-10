import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

export interface SelectSmallFileData {
    title: string;
    description: string;
    buttonLabel: string;
    settings?: {
        allowedFileExtensions?: string[];
        defaultFile?: File;
        filePreviewUrl?: string;
    };
}

@Injectable({
    providedIn: 'root',
})
export class SelectSmallFileModalService {
    selectSmallFileModal$ = new Subject<SelectSmallFileData>();
    @Output() fileSelected$ = new EventEmitter<File>();

    openModal(data: SelectSmallFileData): void {
        this.selectSmallFileModal$.next(data);
    }

    selectFile(file: File): void {
        this.fileSelected$.emit(file);
    }
}
