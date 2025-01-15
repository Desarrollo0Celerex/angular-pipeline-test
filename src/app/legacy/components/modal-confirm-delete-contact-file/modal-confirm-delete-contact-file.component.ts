import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@core/helpers/alert.helper';
import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { ModalConfirmDeleteContactFileService } from './modal-confirm-delete-contact-file.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-delete-contact-file',
    templateUrl: './modal-confirm-delete-contact-file.component.html',
    styles: [],
    providers: [ModalConfirmDeleteContactFileService],
    standalone: false
})
export class ModalConfirmDeleteContactFileComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() contactFileData: ContactFileDataSend | null = null;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _modalConfirmDeleteContactFileService: ModalConfirmDeleteContactFileService,
        private _router: Router
    ) {}

    ngOnInit(): void {}

    /**
     * Event to confirm delete the contact file
     */
    onConfirmAction(): void {
        if (!!this.contactFileData) {
            ModalPlugin.hide(this.modalId);
            this._loadingService.show();
            this._modalConfirmDeleteContactFileService
                .deleteContactFile(this.contactFileData)
                .subscribe(() => {
                    this._loadingService.hide();
                    AlertHelper.fileDeleted(this._reloadPage, this);
                });
        }
    }

    /**
     * Reload the page
     * @param context The app context
     */
    private _reloadPage(context: ModalConfirmDeleteContactFileComponent): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        if (!!context.contactFileData) {
            context._router.navigate(
                [
                    '/' +
                        ROUTES_NAME.listContactFiles(
                            context.contactFileData.contactId
                        ),
                ],
                { relativeTo: context._activatedRoute }
            );
        }
    }
}
