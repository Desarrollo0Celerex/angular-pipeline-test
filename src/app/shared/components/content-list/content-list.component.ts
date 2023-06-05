import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DumbComponent } from '@core/classes/dumb-component';
import { GENDERS } from '@core/constants/settings';

@Component({
    selector: 'agt-content-list',
    templateUrl: './content-list.component.html',
    styles: [],
})
export class ContentListComponent extends DumbComponent {
    @Input() contentName = '';
    @Input() contentGender = GENDERS.MALE;
    @Input() isLoadedContent = false;
    @Input() isLoadingContent = false;
    @Input() noResultsButtonLabel = '';
    @Input() noResultsDetails = '';
    @Input() noResultsMessage = '';
    @Input() totalItems = 0;
    @Input() totalItemsLoaded = 0;
    @Output() loadMoreContents = new EventEmitter<void>();
    @Output() doNoResultsAction = new EventEmitter<void>();

    constructor() {
        super();
    }

    get hasResults(): boolean {
        return this.totalItemsLoaded > 0;
    }

    requestDoNoResultsAction(): void {
        this.doNoResultsAction.emit();
    }

    requestLoadMoreContents(): void {
        this.loadMoreContents.emit();
    }
}
