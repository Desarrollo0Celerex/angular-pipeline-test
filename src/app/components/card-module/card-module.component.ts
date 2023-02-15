import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-card-module',
  templateUrl: './card-module.component.html',
  styles: [
  ]
})
export class CardModuleComponent {
    @Input() title: string = '';
    @Input() subtitle: string = '';
    @Input() icon: string = '';
    @Input() description: string = '';
    @Input() route: string = '';
}
