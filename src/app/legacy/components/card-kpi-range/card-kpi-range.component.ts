import { Component, OnInit, Input } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';

@Component({
    selector: 'agt-card-kpi-range',
    templateUrl: './card-kpi-range.component.html',
    styles: [],
    standalone: false
})
export class CardKpiRangeComponent implements OnInit {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() icon: string = '';
    @Input() buttonLabel: string = '';
    @Input() isButtonPrimary: boolean = false;
    @Input() value: number = 0;
    @Input() rangeData: RangeData | null = null;
    @Input() route: string = '';

    constructor() { }

    ngOnInit(): void {
    }

}
