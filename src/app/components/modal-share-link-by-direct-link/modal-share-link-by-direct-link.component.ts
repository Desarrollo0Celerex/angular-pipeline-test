import { Component, Input } from '@angular/core';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-share-link-by-direct-link',
  templateUrl: './modal-share-link-by-direct-link.component.html',
  styles: [
  ]
})
export class ModalShareLinkByDirectLinkComponent {
    @Input() modalId: string = '';
    @Input() title: string = '';
    @Input() subtitle: string = '';
    @Input() description: string = '';
    @Input() link: string = '';

    copyLink(): void {
        navigator.clipboard.writeText(this.link);
        ModalPlugin.hide(this.modalId);
    }

}
