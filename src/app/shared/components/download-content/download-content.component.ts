import { Component } from '@angular/core';
import { DownloadContent } from '@shared/interfaces/download-content.interface';
import {
    NgxQrcodeErrorCorrectionLevels,
    NgxQrcodeElementTypes,
} from '@techiediaries/ngx-qrcode';
import { ModalHelper } from '@core/helpers/modal.helper';
import { Router } from '@angular/router';
import { ROUTES_NAME } from '@constants/routes-name';

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

    constructor(private _router: Router) {}

    closeModal(): void {
        ModalHelper.hide(this.modalId);
        if (typeof this.data!.cancelRoute === 'string') {
            this._router.navigateByUrl(this.data!.cancelRoute);
        }
        this.reset();
    }

    init(data: DownloadContent): void {
        this.data = data;
        ModalHelper.show(this.modalId);
    }

    reset(): void {
        this.data = undefined;
    }
}
