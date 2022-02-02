import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ChartFilterData } from '@interfaces/chart-filter-data.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-filter-results',
  templateUrl: './modal-filter-results.component.html',
  styles: [
  ]
})
export class ModalFilterResultsComponent {
    @Input() modalId: string = '';
    @Input() filters: ChartFilterData[] = [];
    @Output() filtersSelected: EventEmitter<number[]> = new EventEmitter<number[]>();

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        const selectedFilters: number[] = [];
        for(let filter of this.filters) {
            if(filter.selected === true) {
                selectedFilters.push(filter.id);
            }
        }
        this.filtersSelected.emit(selectedFilters);
    }

    toggleFilter(index: number): void {
        this.filters[index].selected = !this.filters[index].selected;
    }

}
