import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-card-share-link-by-whatsapp',
    templateUrl: './card-share-link-by-whatsapp.component.html',
    styles: [],
    standalone: false
})
export class CardShareLinkByWhatsappComponent {
    @Input() description: string = '';
    @Input() link: string = '';
}
