import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GENDERS } from '@core/constants/settings';
import { DumbComponent } from '@core/classes/dumb-component';

@Component({
    selector: 'agt-card-content-results',
    templateUrl: './card-content-results.component.html',
    styles: [],
})
export class CardContentResultsComponent extends DumbComponent {
    @Input() contentName: string = '';
    @Input() contentGender: number = 0;
    @Input() isLoadingContent: boolean = false;
    @Input() totalItems: number = 0;
    @Input() totalItemsLoaded: number = 0;
    @Output() loadMoreContents: EventEmitter<void> = new EventEmitter<void>();

    constructor() {
        super();
    }

    get allResultsLoadedMessage(): string {
        return this.contentGender == GENDERS.MALE ? 'los' : 'las';
    }

    get singleResultMessage(): string {
        return this.contentGender == GENDERS.MALE ? 'el único' : 'la única';
    }

    requestLoadMoreContents(): void {
        this.loadMoreContents.emit();
    }
}
