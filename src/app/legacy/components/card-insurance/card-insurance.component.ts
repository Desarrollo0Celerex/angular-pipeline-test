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
    @Input() insurance: Insurance | null = null;
    @Output() insuranceSelected: EventEmitter<number> = new EventEmitter<number>();

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    /**
     * Click event to notify that insurance has been selected
     * @param insuranceId The selected insurance ID
     */
    onClickQuoteInsurance(insuranceId: number): void {
        this.insuranceSelected.emit(insuranceId);
    }

}
