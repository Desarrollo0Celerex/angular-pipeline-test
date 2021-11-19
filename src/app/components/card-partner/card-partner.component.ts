import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Partner } from '@interfaces/partner.interface';

@Component({
  selector: 'agt-card-partner',
  templateUrl: './card-partner.component.html',
  styles: [
  ]
})
export class CardPartnerComponent {
    @Input() partner: Partner | null = null;
    @Input() isCoincidence: boolean = false;
    @Output() showDetails: EventEmitter<Partner> = new EventEmitter<Partner>();

    requestShowDetails(): void {
        if(!!this.partner) {
            this.showDetails.emit(this.partner);
        }
    }
}
