import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPage } from './pages/tasks/tasks.page';
import { CalendarPage } from './pages/calendar/calendar.page';
import { TaskRecordPage } from './pages/task-record/task-record.page';
import { TASKS_ROUTES } from '@core/constants/routes';

const routes: Routes = [
    {
        path: '',
        redirectTo: `/${TASKS_ROUTES.MODULE}/${TASKS_ROUTES.TASKS}`,
        pathMatch: 'full',
    },
    { path: TASKS_ROUTES.TASKS, component: TasksPage },
    { path: TASKS_ROUTES.CALENDAR, component: CalendarPage },
    { path: TASKS_ROUTES.TASK_RECORD(':taskId'), component: TasksPage },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TasksRoutingModule {}
