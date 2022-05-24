import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var TooltipPlugin: any;

@Component({
  selector: 'agt-resume',
  templateUrl: './resume.page.html',
  styles: [
  ]
})
export class ResumePage implements OnInit, OnDestroy {
    partnerId: number = 0;
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
            this.partnerId = res.get('partnerId');
        });
    }
}
