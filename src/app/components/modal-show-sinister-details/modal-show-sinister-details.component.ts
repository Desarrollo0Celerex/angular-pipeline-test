import { Component, Input, OnInit } from '@angular/core';

import { Sinister } from '@interfaces/sinister.interface';

@Component({
  selector: 'agt-modal-show-sinister-details',
  templateUrl: './modal-show-sinister-details.component.html',
  styles: [
  ]
})
export class ModalShowSinisterDetailsComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() sinister: Sinister | null = null;

    constructor() { }

    ngOnInit(): void {
    }

    /**
     * Click event to navigate to events
     */
    onclickGoToEvents(): void {
        // TODO: Acción pendiente
        console.log('Mostrar eventos');
    }

}
