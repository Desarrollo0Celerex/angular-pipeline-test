import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Sinister } from '@interfaces/sinister.interface';

declare var PopoverPlugin: any;
declare var TooltipPlugin: any;

@Component({
  selector: 'agt-card-sinister',
  templateUrl: './card-sinister.component.html',
  styles: [
  ]
})
export class CardSinisterComponent implements OnInit {
    @Input() sinister: Sinister | null = null;
    @Output() showContactData: EventEmitter<string> = new EventEmitter<string>();
    @Output() showSinisterDetails: EventEmitter<Sinister> = new EventEmitter<Sinister>();

    constructor() { }

    ngOnInit(): void {
        TooltipPlugin.init();
        PopoverPlugin.init();
    }

    /**
     * Click event to request show the contact data
     */
    onClickShowContactData(): void {
        if(!!this.sinister) {
            this.showContactData.emit(this.sinister.contactId);
        }
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
