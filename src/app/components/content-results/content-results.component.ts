import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ContentResultData } from '@interfaces/content-result-data.interface';

@Component({
  selector: 'agt-content-results',
  templateUrl: './content-results.component.html',
  styles: [
  ]
})
export class ContentResultsComponent {
    @Input() contentResultData: ContentResultData;
    @Input() contentSubtypeName: string;
    @Input() contentTypeName: string;
    @Input() isLoadingContent: boolean;
    @Output() loadMoreContents: EventEmitter<void>;

    constructor() {
        this.contentResultData = {
            loadedItems: 0,
            totalItems: 0
        };
        this.contentTypeName = '';
        this.contentSubtypeName = '';
        this.isLoadingContent = false;
        this.loadMoreContents = new EventEmitter();
    }

    /**
     * Event to load more contents
     */
    onLoadMoreContents(): void {
        this.loadMoreContents.emit();
    }

}
