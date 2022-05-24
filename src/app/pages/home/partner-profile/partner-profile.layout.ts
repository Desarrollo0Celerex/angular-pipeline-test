import { Component, OnInit, OnDestroy } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

import { PartnerProfileService } from './partner-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'agt-partner-profile',
  templateUrl: './partner-profile.layout.html',
  styles: [
  ],
  providers: [PartnerProfileService]
})
export class PartnerProfileLayout implements OnInit, OnDestroy {
    ROUTES_NAME: any = ROUTES_NAME;
    partnerId: number = 0;
    private _subParams: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _partnerProfileService: PartnerProfileService
    ) { }

    ngOnInit(): void {
        this._catchParams();
    }

    ngOnDestroy(): void {
        if(this._subParams) this._subParams.unsubscribe();
    }

    get model(): PartnerProfileService {
        return this._partnerProfileService;
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
