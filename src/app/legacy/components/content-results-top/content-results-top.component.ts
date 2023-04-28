import { Component, Input, OnInit } from '@angular/core';

import { ContentResultData } from '@interfaces/content-result-data.interface';

@Component({
  selector: 'agt-content-results-top',
  templateUrl: './content-results-top.component.html',
  styles: [
  ]
})
export class ContentResultsTopComponent implements OnInit {
    @Input() contentResultData: ContentResultData = {
        loadedItems: 0,
        totalItems: 0
    };
    @Input() contentTypeName: string = '';
    @Input() contentSubtypeName: string = '';

    constructor() { }

    ngOnInit(): void {
    }

}
