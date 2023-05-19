import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-card-share-link-by-facebook',
  templateUrl: './card-share-link-by-facebook.component.html',
  styles: [
  ]
})
export class CardShareLinkByFacebookComponent {
    @Input() description: string = '';
    @Input() link: string = '';
}
