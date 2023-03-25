import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-card-share-link-by-direct-link',
  templateUrl: './card-share-link-by-direct-link.component.html',
  styles: [
  ]
})
export class CardShareLinkByDirectLinkComponent {
    @Input() description: string = '';
    @Input() link: string = '';
    modalIdShareLinkByDirectLink: string = 'agt-share-link-by-direct-link';

    showModalToGenerateDirectLink(): void {
        ModalPlugin.show(this.modalIdShareLinkByDirectLink);
    }

}
