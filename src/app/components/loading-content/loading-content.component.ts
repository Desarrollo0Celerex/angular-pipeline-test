import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-loading-content',
  templateUrl: './loading-content.component.html',
  styles: [
  ]
})
export class LoadingContentComponent {
    @Input() isLoadingContent: boolean;

    constructor() {
        this.isLoadingContent = false;
    }
}
