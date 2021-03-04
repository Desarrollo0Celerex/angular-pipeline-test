import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { LabelFoundFormatPipe } from '@pipes/label-found-format/label-found-format.pipe';

@Component({
  selector: 'agt-search-results',
  templateUrl: './search-results.component.html',
  styles: [
  ]
})
export class SearchResultsComponent implements OnInit, OnDestroy {
    @Input() contentType: number;
    @Input() contentTypeName: string;
    contentSubtypeName: string;
    query: string;
    totalResults: number;
    private subParams: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _labelFoundFormatPipe: LabelFoundFormatPipe
    ) {
        this.contentType = 0;
        this.contentTypeName = '';
        this.contentSubtypeName = '';
        this.query = '';
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
            this.query = params['query'];
            this.contentSubtypeName = this._labelFoundFormatPipe.transform(this.contentType);
        })
    }

}
