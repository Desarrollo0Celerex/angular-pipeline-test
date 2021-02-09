import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Insurance } from '@interfaces/insurance.interface';

declare var PopoverPlugin: any;

@Component({
  selector: 'agt-card-insurance',
  templateUrl: './card-insurance.component.html',
  styles: [
  ]
})
export class CardInsuranceComponent implements OnInit {
    @Input() insurance: Insurance | null;
    @Output() quoteInsurance: EventEmitter<number>;

    constructor() {
        this.insurance = null;
        this.quoteInsurance = new EventEmitter<number>();
    }

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    /**
     * Click event to quote an insurance
     * @param insuranceId The insurance ID to quote
     */
    onClickQuoteInsurance(insuranceId: number): void {
        this.quoteInsurance.emit(insuranceId);
    }

}
