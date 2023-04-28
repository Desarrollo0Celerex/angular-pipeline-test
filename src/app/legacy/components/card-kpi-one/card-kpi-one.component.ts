import { Component, Input, OnInit } from '@angular/core';

import { KpiOne } from '@interfaces/kpi-one.interface';

declare var PopoverPlugin: any;

@Component({
  selector: 'agt-card-kpi-one',
  templateUrl: './card-kpi-one.component.html',
  styles: [
  ]
})
export class CardKpiOneComponent implements OnInit {
    @Input() kpi: KpiOne | null = null;

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    get kpiIcon(): string {
        if(!!this.kpi) {
            if(this.kpi.selectedValue > this.kpi.comparedValue) {
                return 'fe-arrow-up-circle';
            } else if(this.kpi.selectedValue < this.kpi.comparedValue) {
                return 'fe-arrow-down-circle'
            }
        }
        return '';
    }

    get kpiIconColor(): string {
        if(!!this.kpi) {
            if(this.kpi.selectedValue > this.kpi.comparedValue) {
                return 'text-green';
            } else if(this.kpi.selectedValue < this.kpi.comparedValue) {
                return 'text-red'
            }
        }
        return '';
    }

    get selectedPercentage(): number {
        if(!!this.kpi && this.kpi.totalContents > 0 && this.kpi.selectedValue > 0) {
            return Math.ceil(this.kpi.selectedValue * 100 / this.kpi.totalContents);
        }
        return 0;
    }

    get comparedPercentage(): number {
        if(!!this.kpi && this.kpi.totalContents > 0 && this.kpi.comparedValue > 0) {
            return Math.ceil(this.kpi.comparedValue * 100 / this.kpi.totalContents);
        }
        return 0;
    }
}
