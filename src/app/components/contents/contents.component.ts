import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'agt-contents',
  templateUrl: './contents.component.html',
  styles: [
  ]
})
export class ContentsComponent implements OnInit, OnDestroy {
    @Input() contentType: number;
    contentSubtype: number;
    private subParams: any;

    constructor(private _activatedRoute: ActivatedRoute) {
        this.contentType = 0;
        this.contentSubtype = 0;
    }

    ngOnInit(): void {
        this._catchParams();
    }

    ngOnDestroy(): void {
        if(!!this.subParams) this.subParams.unsubscribe();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.subParams = this._activatedRoute.queryParams.subscribe( (params: Params) => {
            this.contentSubtype = (typeof params.contentSubtype !== 'undefined') ? parseInt(params.contentSubtype) : 1;
        })
    }

}
