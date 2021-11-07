import { Component, Input } from '@angular/core';

import { Group } from '@interfaces/group.interface';

@Component({
  selector: 'agt-card-group',
  templateUrl: './card-group.component.html',
  styles: [
  ]
})
export class CardGroupComponent {
    @Input() group: Group | null = null;
}
