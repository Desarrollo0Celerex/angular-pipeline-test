import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CONTENT_TYPES, PARTNER_STATUS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-partner-coincidences',
    templateUrl: './partner-coincidences.page.html',
    styles: [],
    standalone: false
})
export class PartnerCoincidencesPage implements OnInit, OnDestroy {
    contentType: number = CONTENT_TYPES.PARTNER.ID;
    contentTypeName: string = CONTENT_TYPES.COINCIDENCES.NAME;
    contentSubtype: number = CONTENT_TYPES.COINCIDENCES.ID;
    contentSubtypeName: string = 'Encontrada';
    modalIdConfirmCreatePartner: string = 'agt-confirm-create-partner'
    partnerName: string = '';
    totalResults: number = 0;
    private subParams: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this. _catchParams();
    }

    ngOnDestroy(): void {
        if(this.subParams) this.subParams.unsubscribe();
    }

    goToPartners(): void {
        this._router.navigate([ROUTES_NAME.listPartners], { queryParams: { contentSubtype: PARTNER_STATUS.INACTIVE } } );
    }

    /**
     * Load the total results value
     * @param totalResults The total results
     */
    loadTotalResults(totalResults: number): void {
        this.totalResults = totalResults;
    }

    showModalToConfirmCreatePartner(): void {
        ModalPlugin.show(this.modalIdConfirmCreatePartner);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.subParams = this._activatedRoute.queryParams.subscribe( (params: Params) => {
            this.partnerName = params.partnerName || '';
        })
    }

}
