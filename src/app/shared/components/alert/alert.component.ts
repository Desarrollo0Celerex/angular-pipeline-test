import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-alert',
    templateUrl: './alert.component.html',
    styles: [],
})
export class AlertComponent {
    @Input() message = '';
    @Input() type = 'success';
    @Input() icon = 'fe-check-circle';
}
