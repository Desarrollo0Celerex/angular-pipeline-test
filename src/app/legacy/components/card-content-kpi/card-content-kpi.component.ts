import { Component, Input, OnInit } from '@angular/core';

import { ContentKpi } from '@interfaces/content-kpi.interface';

@Component({
    selector: 'agt-card-content-kpi',
    templateUrl: './card-content-kpi.component.html',
    styles: [],
})
export class CardContentKpiComponent {
    @Input() contentKpi: ContentKpi | null = null;
}
