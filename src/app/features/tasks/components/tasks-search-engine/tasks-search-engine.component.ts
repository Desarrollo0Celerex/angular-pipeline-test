import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TASKS_ROUTES } from '@core/constants/routes';
import { ModuleService } from '@features/tasks/services/module.service';

@Component({
    selector: 'agt-tasks-search-engine',
    templateUrl: './tasks-search-engine.component.html',
    styles: [],
})
export class TasksSearchEngineComponent {
    constructor(
        private _moduleService: ModuleService,
        private _router: Router
    ) {}

    goToSearchTasks(query: string): void {
        this._moduleService.changeQuery(query);
        this._router.navigateByUrl(
            `${TASKS_ROUTES.MODULE}/${TASKS_ROUTES.TASK_RESULTS}`
        );
        /* this._router.navigate(
            [`${TASKS_ROUTES.MODULE}/${TASKS_ROUTES.TASK_RESULTS}`],
            { queryParams: { query } }
        ); */
    }
}
