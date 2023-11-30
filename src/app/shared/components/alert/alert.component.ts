import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-alert',
    templateUrl: './alert.component.html',
    styles: [],
})
export class AlertComponent {
    @Input() message = '';
    @Input() type = 'success';

    get icon() {
        switch (this.type) {
            case 'success':
                return 'fe-check-circle';
            case 'failed':
                return 'fa-exclamation-circle';
            default:
                return '';
        }
    }
}
