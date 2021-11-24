import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-resume',
  templateUrl: './resume.page.html',
  styles: [
  ]
})
export class ResumePage implements OnInit {
    contentType: number = CONTENT_TYPES.PARTNER_CLIENT.ID;
    contentTypeName: string = CONTENT_TYPES.PARTNER_CLIENT.NAME;
    contentSubtype: number = 1;
    contentSubtypeName: string = 'del Socio';
    partnerId: string = '';
    subParams: any | null = null;

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._catchParams();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.subParams = this._activatedRoute.paramMap.subscribe((res: any) => {
            this.partnerId = res.get('partnerId');
        });
    }
}
