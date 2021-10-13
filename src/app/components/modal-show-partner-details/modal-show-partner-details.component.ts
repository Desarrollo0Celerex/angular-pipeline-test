import { Component, Input } from '@angular/core';

import { Partner } from '@interfaces/partner.interface';

@Component({
  selector: 'agt-modal-show-partner-details',
  templateUrl: './modal-show-partner-details.component.html',
  styles: [
  ]
})
export class ModalShowPartnerDetailsComponent {
    @Input() modalId: string = '';
    @Input() partner: Partner | null = null;
}
