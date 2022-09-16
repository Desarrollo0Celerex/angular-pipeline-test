import { Component, OnInit } from '@angular/core';

import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';

@Component({
  selector: 'agt-stats-sinisters',
  templateUrl: './stats-sinisters.page.html',
  styles: [
  ]
})
export class StatsSinistersPage implements OnInit {
    range: RangeData | null = null;
    statsPeriodData: StatsPeriodData | null = null;

    constructor() { }

    ngOnInit(): void {
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.statsPeriodData = statsPeriodData;
        this.range = UtilitiesHelper.generateRange(statsPeriodData);
    }

}
