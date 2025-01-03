import { Component, Input } from '@angular/core';

import { ModalDownloadFileData } from '@interfaces/modal-download-file-data.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-download-file',
    templateUrl: './modal-download-file.component.html',
    styles: [],
})
export class ModalDownloadFileComponent {
    @Input() fileUrl: string = '';
    @Input() data: ModalDownloadFileData | null = null;
    @Input() modalId: string = '';

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
