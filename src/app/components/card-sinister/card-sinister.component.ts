import { Component, Input, OnInit } from '@angular/core';

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

    constructor() { }

    ngOnInit(): void {
        PopoverPlugin.init();
    }

}
