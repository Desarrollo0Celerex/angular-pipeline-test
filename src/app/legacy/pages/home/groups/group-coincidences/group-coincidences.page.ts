import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CONTENT_TYPES, GROUP_STATUS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-group-coincidences',
    templateUrl: './group-coincidences.page.html',
    styles: [],
    standalone: false
})
export class GroupCoincidencesPage implements OnInit, OnDestroy {
    contentType: number = CONTENT_TYPES.GROUP.ID;
    contentTypeName: string = CONTENT_TYPES.COINCIDENCES.NAME;
    contentSubtype: number = CONTENT_TYPES.COINCIDENCES.ID;
    contentSubtypeName: string = 'Encontrada';
    modalIdConfirmCreateGroup: string = 'agt-confirm-create-group'
    groupName: string = '';
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

    goToIncompleteGroups(): void {
        this._router.navigate([ROUTES_NAME.listGroups], { queryParams: { contentSubtype: GROUP_STATUS.INCOMPLETE } } );
    }

    /**
     * Load the total results value
     * @param totalResults The total results
     */
    loadTotalResults(totalResults: number): void {
        this.totalResults = totalResults;
    }

    showModalToConfirmCreateGroup(): void {
        ModalPlugin.show(this.modalIdConfirmCreateGroup);
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.subParams = this._activatedRoute.queryParams.subscribe( (params: Params) => {
            this.groupName = params.groupName || '';
        })
    }

}
