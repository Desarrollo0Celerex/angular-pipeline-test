import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Kpi } from '@core/interfaces/kpi.interface';
import { DumbComponent } from '@core/classes/dumb-component';

@Component({
    selector: 'agt-card-kpi',
    templateUrl: './card-kpi.component.html',
    styles: [],
    standalone: false
})
export class CardKpiComponent extends DumbComponent {
    @Input() kpi: Kpi | undefined = undefined;
    @Input() selectedContentSubtype: number = 0;
    @Output() contentSubtypeSelected: EventEmitter<number> =
        new EventEmitter<number>();

    constructor() {
        super();
    }

    get canShowActions(): boolean {
        return this.selectedContentSubtype !== this.kpi?.contentSubtype;
    }

    get percentage(): number {
        return this.kpi && this.kpi.total > 0
            ? this.kpi.value / this.kpi.total
            : 0;
    }

    selectContentSubtype(contentSubtype: number): void {
        this.contentSubtypeSelected.emit(contentSubtype);
    }
}
