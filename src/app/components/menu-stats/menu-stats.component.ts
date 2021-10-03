import { Component, OnInit } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';

@Component({
  selector: 'agt-menu-stats',
  templateUrl: './menu-stats.component.html',
  styles: [
  ]
})
export class MenuStatsComponent implements OnInit {
    ROUTES_NAME: any = ROUTES_NAME;

  constructor() { }

  ngOnInit(): void {
  }

}
