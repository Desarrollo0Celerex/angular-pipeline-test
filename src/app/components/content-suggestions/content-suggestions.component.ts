import { Component, Input } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { ContentResultData } from '@interfaces/content-result-data.interface';

@Component({
  selector: 'agt-content-suggestions',
  templateUrl: './content-suggestions.component.html',
  styles: [
  ]
})
export class ContentSuggestionsComponent {
    @Input() contentResultData: ContentResultData;
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() isLoadingContent: boolean;
    CONTENT_TYPES: any;

    constructor() {
        this.contentResultData = {
            loadedItems: 0,
            totalItems: 0
        };
        this.contentType = 0;
        this.contentTypeName = '';
        this.isLoadingContent = false;
        this.CONTENT_TYPES = CONTENT_TYPES;
    }

}
