import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-loading-content',
    templateUrl: './loading-content.component.html',
    styleUrls: ['./loading-content.component.scss'],
    standalone: false
})
export class LoadingContentComponent {
    @Input() isLoadingContent: boolean;
    @Input() height: number = 200;

    constructor() {
        this.isLoadingContent = false;
    }
}
