import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AlertHelper } from '@helpers/alert.helper';
import { ROUTES_NAME } from '@constants/routes-name';
import { LoadingService } from '@services/loading.service';

import { PartnerProfileService } from './partner-profile.service';
import { ActivatedRoute } from '@angular/router';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-partner-profile',
  templateUrl: './partner-profile.layout.html',
  styles: [
  ],
  providers: [PartnerProfileService]
})
export class PartnerProfileLayout implements OnInit, OnDestroy {
    ROUTES_NAME: any = ROUTES_NAME;
    modalIdConfirmDeletePartner: string = 'pp-modal-confirm-delete-partner';
    modalIdSelectContactType: string = 'pp-modal-select-contact-type';
    modalIdShowPartnerDetails: string = 'pp-modal-show-partner-details';
    modalIdUpdatePartner: string = 'pp-modal-update-partner';
    partnerId: number = 0;
    private _subParams: any;

    constructor(
        public model: PartnerProfileService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._catchParams();
    }

    ngOnDestroy(): void {
        if(this._subParams) this._subParams.unsubscribe();
    }

    deletePartner(): void {
        this._loadingService.show();
        this.model.deletePartner(this.partnerId).subscribe(() => {
            this._router.navigateByUrl(ROUTES_NAME.listPartners);
            this._loadingService.hide();
            AlertHelper.partnerDeleted();
        });
    }

    showModalConfirmDeletePartner(): void {
        ModalPlugin.show(this.modalIdConfirmDeletePartner);
    }

    showModalPartnerDetails(): void {
        ModalPlugin.show(this.modalIdShowPartnerDetails);
    }

    showModalSelectContactType(): void {
        ModalPlugin.show(this.modalIdSelectContactType);
    }

    showModalUpdatePartner(): void {
        ModalPlugin.show(this.modalIdUpdatePartner);
    }

    updatePartnerName(name: string): void {
        this.model.partner!.name = name;
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        if(!!this._activatedRoute.firstChild) {
            this._subParams = this._activatedRoute.firstChild.paramMap.subscribe((res: any) => {
                this.partnerId = res.get('partnerId');
                this.model.loadPartner(this.partnerId);
            });
        }
    }

}
