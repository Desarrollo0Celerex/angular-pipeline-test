import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TASK_PLANNER_ROUTES } from '@configs/routes.config';

const routes: Routes = [
    {
        path: '',
        redirectTo: `/${TASK_PLANNER_ROUTES.MODULE}/${TASK_PLANNER_ROUTES.TASKS}`,
        pathMatch: 'full',
    },
    {
        path: TASK_PLANNER_ROUTES.TASKS,
        loadChildren: () =>
            import('./tasks/tasks.module').then((mod) => mod.TasksModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TaskPlannerRoutingModule {}
