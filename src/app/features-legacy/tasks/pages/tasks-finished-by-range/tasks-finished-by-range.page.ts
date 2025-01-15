import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TASK_STATUS } from '@core/constants/settings';
import { ModuleService } from '@features-legacy/tasks/services/module.service';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import moment from 'moment';

@Component({
    selector: 'agt-tasks-finished-by-range',
    templateUrl: './tasks-finished-by-range.page.html',
    styles: [],
    standalone: false
})
export class TasksFinishedByRangePage {
    rangeField: string = 'taskFinishedDate';
    sortBy = 'taskFinishedDate';
    statsPeriodData: StatsPeriodData | null = null;
    specialFilter: string = '';
    filters = [TASK_STATUS.FINISHED];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _moduleService: ModuleService
    ) {}

    ngOnInit(): void {
        this.statsPeriodData = this._generatePeriodData();
        this._moduleService.setTaskStatusId(0);
    }

    applySpecialFilter(specialFilter: string): void {
        this.specialFilter = specialFilter;
    }

    loadContent(statsPeriodData: StatsPeriodData): void {
        this.specialFilter = '';
        this.statsPeriodData = statsPeriodData;
    }

    private _generatePeriodData(): StatsPeriodData {
        const startDate: string =
            this._activatedRoute.snapshot.queryParamMap.get('rangeStart') ||
            moment().subtract(30, 'days').format('DD/MM/YYYY');
        const endDate: string =
            this._activatedRoute.snapshot.queryParamMap.get('rangeEnd') ||
            moment().format('DD/MM/YYYY');
        return {
            startDate,
            endDate,
            periodId: 0,
        };
    }
}
