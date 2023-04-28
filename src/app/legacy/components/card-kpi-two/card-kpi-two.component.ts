import { Component, Input, OnInit } from '@angular/core';

import { KpiTwo } from '@interfaces/kpi-two.interface';

@Component({
  selector: 'agt-card-kpi-two',
  templateUrl: './card-kpi-two.component.html',
  styles: [
  ]
})
export class CardKpiTwoComponent implements OnInit {
    @Input() kpi: KpiTwo | null = null;

    constructor() { }

    ngOnInit(): void {
    }

    get kpiIconOne(): string {
        if(!!this.kpi) {
            if(this.kpi.selectedTotalGeneratedQuotations > this.kpi.comparedTotalGeneratedQuotations) {
                return 'fe-arrow-up-circle';
            } else if(this.kpi.selectedTotalGeneratedQuotations < this.kpi.comparedTotalGeneratedQuotations) {
                return 'fe-arrow-down-circle'
            }
        }
        return '';
    }

    get kpiIconColorOne(): string {
        if(!!this.kpi) {
            if(this.kpi.selectedTotalGeneratedQuotations > this.kpi.comparedTotalGeneratedQuotations) {
                return 'text-green';
            } else if(this.kpi.selectedTotalGeneratedQuotations < this.kpi.comparedTotalGeneratedQuotations) {
                return 'text-red'
            }
        }
        return '';
    }

    get kpiIconTwo(): string {
        if(!!this.kpi) {
            if(this.kpi.selectedTotalAcceptedQuotations > this.kpi.comparedTotalAcceptedQuotations) {
                return 'fe-arrow-up-circle';
            } else if(this.kpi.selectedTotalAcceptedQuotations < this.kpi.comparedTotalAcceptedQuotations) {
                return 'fe-arrow-down-circle'
            }
        }
        return '';
    }

    get kpiIconColorTwo(): string {
        if(!!this.kpi) {
            if(this.kpi.selectedTotalAcceptedQuotations > this.kpi.comparedTotalAcceptedQuotations) {
                return 'text-green';
            } else if(this.kpi.selectedTotalAcceptedQuotations < this.kpi.comparedTotalAcceptedQuotations) {
                return 'text-red'
            }
        }
        return '';
    }

    get kpiIconThree(): string {
        if(!!this.kpi) {
            if(this.selectedPercentage > this.comparedPercentage) {
                return 'fe-arrow-up-circle';
            } else if(this.selectedPercentage < this.comparedPercentage) {
                return 'fe-arrow-down-circle'
            }
        }
        return '';
    }

    get kpiIconColorThree(): string {
        if(!!this.kpi) {
            if(this.selectedPercentage > this.comparedPercentage) {
                return 'text-green';
            } else if(this.selectedPercentage < this.comparedPercentage) {
                return 'text-red'
            }
        }
        return '';
    }

    get selectedPercentage(): number {
        if(!!this.kpi && this.kpi.selectedTotalAcceptedQuotations > 0) {
            return Math.round(this.kpi.selectedTotalAcceptedQuotations * 100 / this.kpi.selectedTotalGeneratedQuotations);
        }
        return 0;
    }

    get comparedPercentage(): number {
        if(!!this.kpi && this.kpi.comparedTotalGeneratedQuotations > 0) {
            return Math.round(this.kpi.comparedTotalAcceptedQuotations * 100 / this.kpi.comparedTotalGeneratedQuotations);
        }
        return 0;
    }

}
