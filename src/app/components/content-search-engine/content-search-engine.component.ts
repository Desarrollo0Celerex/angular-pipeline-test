import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import { ContentSearchEngineService } from './content-search-engine.service';

@Component({
  selector: 'agt-content-search-engine',
  templateUrl: './content-search-engine.component.html',
  styles: [
  ]
})
export class ContentSearchEngineComponent implements OnInit {
    @Input() contentType: number;
    @Input() contentTypeName: string;

    constructor(
        public contentSearchEngineService: ContentSearchEngineService,
        private _router: Router
    ) {
        this.contentType = 0;
        this.contentTypeName = '';
    }

    ngOnInit(): void {
        this.contentSearchEngineService.buildSearchForm();
    }

    /**
     * Submit event to search content
     */
    onSubmitSearchContent(): void {
        const query: string = this.contentSearchEngineService.f.query.value.trim();
        if(this.contentSearchEngineService.searchForm.valid && !!query) {
            switch(this.contentType) {
                case CONTENT_TYPES.LEAD:
                    this._router.navigate([ROUTES_NAME.leadSearchResults], { queryParams: { query }});
                break;
            }
        }
    }

}
