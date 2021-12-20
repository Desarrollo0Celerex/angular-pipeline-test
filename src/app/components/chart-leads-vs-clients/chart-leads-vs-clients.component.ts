import { Component, OnInit } from '@angular/core';

import { ChartLeadsVsClientsService } from './chart-leads-vs-clients.service';

@Component({
  selector: 'agt-chart-leads-vs-clients',
  templateUrl: './chart-leads-vs-clients.component.html',
  styles: [
  ],
  providers: [ChartLeadsVsClientsService]
})
export class ChartLeadsVsClientsComponent implements OnInit {

    constructor(public chartLeadsVsClientsService: ChartLeadsVsClientsService) { }

    ngOnInit(): void {
    }

}
