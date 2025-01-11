import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'agt-alert-scanner-failed',
    templateUrl: './alert-scanner-failed.component.html',
    styles: [],
    standalone: false
})
export class AlertScannerFailedComponent {
    @Input() contactName: string = '';
}
