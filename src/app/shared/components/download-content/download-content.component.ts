import { Component } from '@angular/core';
import { DownloadContent } from '@shared/interfaces/download-content.interface';
import {
    NgxQrcodeErrorCorrectionLevels,
    NgxQrcodeElementTypes,
} from '@techiediaries/ngx-qrcode';
import { ModalHelper } from '@core/helpers/modal.helper';

@Component({
    selector: 'agt-download-content',
    templateUrl: './download-content.component.html',
    styles: [],
})
export class DownloadContentComponent {
    contentUrl: string | undefined = undefined;
    data: DownloadContent | undefined = undefined;
    modalId = 'agt-modal-download-content';
    ngxCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
    ngxElementType = NgxQrcodeElementTypes.URL;

    closeModal(): void {
        this.reset();
        ModalHelper.hide(this.modalId);
    }

    init(data: DownloadContent): void {
        this.data = data;
        setTimeout(() => {
            ModalHelper.show(this.modalId);
        }, 0);
    }

    reset(): void {
        this.data = undefined;
    }
}
