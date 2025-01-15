import { Component } from '@angular/core';
import { DownloadContent } from '@shared/interfaces/download-content.interface';
import { ModalHelper } from '@core/helpers/modal.helper';
import { Router } from '@angular/router';

@Component({
    selector: 'agt-download-content',
    templateUrl: './download-content.component.html',
    styles: [],
    standalone: false
})
export class DownloadContentComponent {
    data: DownloadContent | undefined = undefined;
    modalId = 'agt-modal-download-content';

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
