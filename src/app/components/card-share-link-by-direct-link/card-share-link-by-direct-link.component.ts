import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-card-share-link-by-direct-link',
  templateUrl: './card-share-link-by-direct-link.component.html',
  styles: [
  ]
})
export class CardShareLinkByDirectLinkComponent {
    @Input() description: string = '';
    @Input() link: string = '';

    showModalToGenerateDirectLink(): void {
        console.log('mostrar modal!!'); 
    }

}
