import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Sinister } from '@interfaces/sinister.interface';

declare var PopoverPlugin: any;

@Component({
  selector: 'agt-card-sinister',
  templateUrl: './card-sinister.component.html',
  styles: [
  ]
})
export class CardSinisterComponent implements OnInit {
    @Input() sinister: Sinister | null = null;
    @Output() showSinisterDetails: EventEmitter<Sinister> = new EventEmitter<Sinister>();

    constructor() { }

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    /**
     * Click event to request show the sinister details
     */
    onClickShowDetails(): void {
        if(!!this.sinister) {
            this.showSinisterDetails.emit(this.sinister);
        }
    }

}
