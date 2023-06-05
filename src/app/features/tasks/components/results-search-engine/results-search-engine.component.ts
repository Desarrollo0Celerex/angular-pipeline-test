import { Component, OnInit } from '@angular/core';
import { SmartComponent } from '@core/classes/smart-component';
import { ModuleService } from '@features/tasks/services/module.service';

@Component({
    selector: 'agt-results-search-engine',
    templateUrl: './results-search-engine.component.html',
    styles: [],
})
export class ResultsSearchEngineComponent
    extends SmartComponent
    implements OnInit
{
    query: string = '';
    totalResults: number | undefined = undefined;

    constructor(private _moduleService: ModuleService) {
        super();
    }

    ngOnInit(): void {
        this._moduleService.query$
            .pipe(this.takeOne())
            .subscribe((query: string) => {
                this.query = query;
            });
        this._moduleService.totalResults$
            .pipe(this.untilComponentDestroy())
            .subscribe((totalResults: number) => {
                this.totalResults = totalResults;
            });
    }

    searchPayments(query: string): void {
        this._moduleService.changeQuery(query);
    }
}
