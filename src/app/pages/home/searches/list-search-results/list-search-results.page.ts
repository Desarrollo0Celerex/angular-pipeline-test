import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { LabelFoundFormatPipe } from '@pipes/label-found-format/label-found-format.pipe';

@Component({
  selector: 'agt-list-search-results',
  templateUrl: './list-search-results.page.html',
  styles: [
  ]
})
export class ListSearchResultsPage implements OnInit, OnDestroy {
    contentType: number;
    contentTypeName: string;
    contentSubtypeName: string;
    query: string;
    totalResults: number;
    private subParams: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _labelFoundFormatPipe: LabelFoundFormatPipe
    ) {
        this.contentType = 2;
        this.contentTypeName = 'Prospecto';
        this.contentSubtypeName = '';
        this.query = 'migu';
        this.totalResults = 0;
    }

    ngOnInit(): void {
        this.catchParams();
    }

    ngOnDestroy(): void {
        if(!!this.subParams) this.subParams.unsubscribe();
    }

    /**
     * Event to load the total results value
     * @param totalResults The total results
     */
    onTotalResultsLoaded(totalResults: number): void {
        this.totalResults = totalResults;
    }

    /**
     * Catch the params
     */
    private catchParams(): void {
        this.subParams = this._activatedRoute.queryParams.subscribe( (params: Params) => {
            this.contentType = parseInt(params['contentType']);
            this.contentTypeName = params['contentTypeName'];
            this.query = params['query'];
            this.contentSubtypeName = this._labelFoundFormatPipe.transform(this.contentType);
        })
    }
}
