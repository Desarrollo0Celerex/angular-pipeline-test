import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { SINISTER_STATUS } from '@constants/global';

import { CardKpiTotalOpenSinistersService } from './card-kpi-total-open-sinisters.service';

@Component({
  selector: 'agt-card-kpi-total-open-sinisters',
  templateUrl: './card-kpi-total-open-sinisters.component.html',
  styles: [
  ],
  providers: [CardKpiTotalOpenSinistersService]
})
export class CardKpiTotalOpenSinistersComponent implements OnInit {

    constructor(
        public cardKpiTotalOpenSinistersService: CardKpiTotalOpenSinistersService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.cardKpiTotalOpenSinistersService.loadTotalOpenSinisters();
    }

    goToListPendingSinisters(): void {
        this._router.navigate([ROUTES_NAME.listSinisters], { queryParams: { contentSubtype: SINISTER_STATUS.PENDING} })
    }

}
