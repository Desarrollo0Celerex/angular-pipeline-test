import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { ContainerInsurancesBySearchService } from './container-insurances-by-search.service';

@Component({
  selector: 'agt-container-insurances-by-search',
  templateUrl: './container-insurances-by-search.component.html',
  styles: [
  ],
  providers: [ContainerInsurancesBySearchService]
})
export class ContainerInsurancesBySearchComponent implements OnInit, OnChanges {
    @Input() query: string = '';
    @Output() insuranceIdSelected: EventEmitter<number> = new EventEmitter<number>();

    constructor(public model: ContainerInsurancesBySearchService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.query && changes.query.currentValue !== '') {
            if(this.model.allInsurances.length === 0) {
                this._loadInsurances();
            } else {
                this.model.searchInsurance(this.query);
            }
        }
    }

    ngOnInit(): void {

    }

    selectInsurance(insuranceId: number): void {
        this.insuranceIdSelected.emit(insuranceId);
    }

    private _loadInsurances(): void {
        this.model.loadInsurances().subscribe(() => {
            this.model.searchInsurance(this.query);
        });
    }

}
