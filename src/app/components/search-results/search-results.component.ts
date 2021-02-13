import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'agt-search-results',
  templateUrl: './search-results.component.html',
  styles: [
  ]
})
export class SearchResultsComponent implements OnInit, OnDestroy {
    @Input() contentType: number;
    @Input() contentTypeName: string;
    query: string;
    totalResults: number;
    private subParams: any;

    constructor(private _activatedRoute: ActivatedRoute) {
        this.contentType = 0;
        this.contentTypeName = '';
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
        })
    }

}
