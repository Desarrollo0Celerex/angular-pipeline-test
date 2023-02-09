import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'agt-card-kpi-percentage',
  templateUrl: './card-kpi-percentage.component.html',
  styles: [
  ]
})
export class CardKpiPercentageComponent implements  OnChanges {
    @Input() title: string = '';
    @Input() total: number | null = null;
    @Input() value: number | null = null;
    isContentLoaded: boolean = false;
    kpiClass: string = '';
    kpiIcon: string = '';
    percentage: number = 0;

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.total != 'undefined' && changes.total.currentValue !== null) {
            this._checkInputs();
        }
        if(typeof changes.value != 'undefined' && changes.value.currentValue !== null) {
            this._checkInputs();
        }
    }

    private _calculatePercentageClass(percentage: number): string {
        let kpiClass : string = '';
        switch (true) {
            case percentage >= 90: kpiClass = 'success'; break;
            case percentage >= 60: kpiClass = 'warning'; break;
            default: kpiClass = 'danger'; break;
        }
        return kpiClass;
    }

    private _calculatePercentageIcon(percentage: number): string {
        let kpiIcon: string = '';
        switch (true) {
            case percentage >= 90: kpiIcon = 'fe-arrow-up-circle'; break;
            case percentage >= 60: kpiIcon = 'fe-minus-circle'; break;
            default: kpiIcon = 'fe-arrow-down-circle'; break;
        }
        return kpiIcon;
    }

    private _checkInputs(): void {
        if(this.total !== null && this.value !== null) {
            this.percentage = (this.total === 0) ? 0 : Math.round(this.value * 100 / this.total);
            this.kpiClass = this._calculatePercentageClass(this.percentage);
            this.kpiIcon = this._calculatePercentageIcon(this.percentage);
            this.isContentLoaded = true;
        }
    }

}
