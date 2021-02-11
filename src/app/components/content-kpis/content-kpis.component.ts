import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import { ContentKpisService } from './content-kpis.service';

declare var CounterPlugin: any;

@Component({
  selector: 'agt-content-kpis',
  templateUrl: './content-kpis.component.html',
  styles: [
  ]
})
export class ContentKpisComponent implements OnInit, OnDestroy {
    @Input() contentType: number;
    ROUTES_NAME: any;
    id: number;
    private subParams: any;

    constructor(
        public contentKpisService: ContentKpisService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.contentType = 0;
        this.ROUTES_NAME = ROUTES_NAME;
        this.id = 0;
    }

    ngOnInit(): void {
        this._catchParams();
        this.loadKpis();
    }

    ngOnDestroy(): void {
        if(!!this.subParams) this.subParams.unsubscribe();
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.subParams = this._activatedRoute.queryParams.subscribe( (params: Params) => {
            this.id = (typeof params.id !== 'undefined') ? parseInt(params.id) : 1;
        })
    }

    /**
     * Load the kpis
     */
    private loadKpis(): void {
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD:
                this.contentKpisService.loadLeadKpis().subscribe( () => {
                    CounterPlugin.countUp();
                });
            break;
        }
    }

}
