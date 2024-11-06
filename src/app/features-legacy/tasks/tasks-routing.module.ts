import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPage } from './pages/tasks/tasks.page';
import { CalendarPage } from './pages/calendar/calendar.page';
import { TaskResultsPage } from './pages/task-results/task-results.page';
import { TASKS_ROUTES } from '@core/constants/routes';
import { TasksFinishedByRangePage } from './pages/tasks-finished-by-range/tasks-finished-by-range.page';

const routes: Routes = [
    {
        path: TASKS_ROUTES.TASKS,
        component: TasksPage,
        title: 'Agenthos - Task Planner',
    },
    {
        path: TASKS_ROUTES.CALENDAR,
        component: CalendarPage,
        title: 'Agenthos - Task Planner',
    },
    {
        path: TASKS_ROUTES.TASK_RESULTS,
        component: TaskResultsPage,
        title: 'Agenthos - Task Planner',
    },
    {
        path: TASKS_ROUTES.TASK_RECORD(':taskId'),
        component: TasksPage,
        title: 'Agenthos - Task Planner',
    },
    {
        path: TASKS_ROUTES.TASK_FINISHED_BY_RANGE,
        component: TasksFinishedByRangePage,
        title: 'Agenthos - Task Planner',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TasksRoutingModule {}
