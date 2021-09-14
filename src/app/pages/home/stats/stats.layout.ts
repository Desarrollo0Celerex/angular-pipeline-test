import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-stats',
  templateUrl: './stats.layout.html',
  styles: [
  ]
})
export class StatsLayout implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;

    constructor() { }

    ngOnInit(): void {
    }

}
