import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentKpi } from '@core/interfaces/content-kpi.interface';
import { DumbComponent } from '@core/classes/dumb-component';

@Component({
    selector: 'agt-card-content-kpi',
    templateUrl: './card-content-kpi.component.html',
    styles: [],
})
export class CardContentKpiComponent extends DumbComponent {
    @Input() kpi: ContentKpi | undefined = undefined;
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
