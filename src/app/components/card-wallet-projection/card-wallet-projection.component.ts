import { Component, Input, OnInit } from '@angular/core';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-card-wallet-projection',
  templateUrl: './card-wallet-projection.component.html',
  styles: [
  ]
})
export class CardWalletProjectionComponent implements OnInit {
    @Input() contactId: string = '';

    constructor() { }

    ngOnInit(): void {
        ChartPlugin.loadWalletProjection();
    }

}
