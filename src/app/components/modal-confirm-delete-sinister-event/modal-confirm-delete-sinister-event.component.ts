import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { SinisterEventDataSend } from '@interfaces/sinister-event-data-send.interface';
import { LoadingService } from '@services/loading.service';

import { ModalConfirmDeleteSinisterEventService } from './modal-confirm-delete-sinister-event.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-delete-sinister-event',
  templateUrl: './modal-confirm-delete-sinister-event.component.html',
  styles: [
  ]
})
export class ModalConfirmDeleteSinisterEventComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() sinisterEventData: SinisterEventDataSend | null = null;

    constructor(
        private _modalConfirmDeleteSinisterEventService: ModalConfirmDeleteSinisterEventService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
    }

    /**
     * Click event to confirm delete the sinister event
     */
    onClickConfirmAction(): void {
        if(!!this.sinisterEventData) {
            ModalPlugin.hide(this.modalId);
            this._loadingService.show()
            this._modalConfirmDeleteSinisterEventService.deleteSinisterEvent(this.sinisterEventData).subscribe(() => {
                this._loadingService.hide();
                AlertHelper.sinisterEventDeleted(this._reloadPage, this)
            });
        }
    }

    /**
     * Reload the page
     * @param context The app context
     */
    private _reloadPage(context: ModalConfirmDeleteSinisterEventComponent): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        if(!!context.sinisterEventData) {
            context._router.navigate(['/' + ROUTES_NAME.showSinisterHistory(context.sinisterEventData.contactId, context.sinisterEventData.policyId, context.sinisterEventData.sinisterId)], { relativeTo: context._activatedRoute });
        }
    }

}
