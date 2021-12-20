import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { ChartQuotesVsEmissionsService } from './chart-quotes-vs-emissions.service';

@Component({
  selector: 'agt-chart-quotes-vs-emissions',
  templateUrl: './chart-quotes-vs-emissions.component.html',
  styles: [
  ],
  providers: [
      ChartQuotesVsEmissionsService
  ]
})
export class ChartQuotesVsEmissionsComponent implements OnInit {

    constructor(
        private _chartQuotesVsEmissiionsService: ChartQuotesVsEmissionsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
    }

    get model(): ChartQuotesVsEmissionsService {
        return this._chartQuotesVsEmissiionsService;
    }

    goToPoliciesStats(): void {
        this._router.navigateByUrl(ROUTES_NAME.statsPolicies);
    }

}
