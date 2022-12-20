import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'agt-alert-scanner-failed',
  templateUrl: './alert-scanner-failed.component.html',
  styles: [
  ]
})
export class AlertScannerFailedComponent {
    @Input() contactName: string = '';
}
