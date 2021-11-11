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
    contentType: number = CONTENT_TYPES.GROUP_MEMBER.ID;
    contentTypeName: string = CONTENT_TYPES.GROUP_MEMBER.NAME;
    contentSubtype: number = 1;
    contentSubtypeName: string = 'del Grupo';
    groupId: string = '';
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
            this.groupId = res.get('groupId');
        });
    }

}
