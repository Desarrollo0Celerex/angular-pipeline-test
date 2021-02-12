import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ContentResultData } from '@interfaces/content-result-data.interface';

@Component({
  selector: 'agt-content-results',
  templateUrl: './content-results.component.html',
  styles: [
  ]
})
export class ContentResultsComponent {
    @Input() isLoadingContent: boolean;
    @Input() contentResultData: ContentResultData;
    @Output() loadMoreContents: EventEmitter<void>;

    constructor() {
        this.isLoadingContent = false;
        this.contentResultData = {
            loadedItems: 0,
            totalItems: 0
        };
        this.loadMoreContents = new EventEmitter();
    }

    /**
     * Event to load more contents
     */
    onLoadMoreContents(): void {
        this.loadMoreContents.emit();
    }

}
