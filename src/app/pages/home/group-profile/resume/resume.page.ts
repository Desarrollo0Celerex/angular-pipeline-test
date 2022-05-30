import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

declare var TooltipPlugin: any;

@Component({
  selector: 'agt-resume',
  templateUrl: './resume.page.html',
  styles: [
  ]
})
export class ResumePage implements OnInit, OnDestroy {
    groupId: string = '';
    rangeStart: string = moment().subtract(60, 'day').format('DD/MM/YYYY');
    rangeEnd: string = moment().add(30, 'day').format('DD/MM/YYYY');
    private _subParams: any | null = null;

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._catchParams();
        TooltipPlugin.init();
    }

    ngOnDestroy(): void {
        if(!!this._subParams) this._subParams.unsubscribe();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this._subParams = this._activatedRoute.paramMap.subscribe((res: any) => {
            this.groupId = res.get('groupId');
        });
    }
}
