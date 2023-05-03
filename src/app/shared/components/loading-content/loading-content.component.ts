import { Component, Input } from '@angular/core';
import { DumbComponent } from '@core/classes/dumb-component';

@Component({
    selector: 'agt-loading-content',
    templateUrl: './loading-content.component.html',
    styleUrls: ['./loading-content.component.scss'],
})
export class LoadingContentComponent extends DumbComponent {
    @Input() isLoadingContent: boolean;
    @Input() height: number = 200;

    constructor() {
        super();
        this.isLoadingContent = false;
    }
}
