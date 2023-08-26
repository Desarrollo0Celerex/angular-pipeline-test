import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskProgressStatusModule } from '@task-progress-status/task-progress-status.module';
import { WorkspaceUsersModule } from '@workspace-users/workspace-users.module';
import { TaskService } from './services/task.service';
import { SynchronizeTaskComponent } from './components/synchronize-task/synchronize-task.component';
import { SelectTaskCalendarComponent } from './components/select-task-calendar/select-task-calendar.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
        CreateTaskComponent,
        SynchronizeTaskComponent,
        SelectTaskCalendarComponent,
    ],
    exports: [CreateTaskComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        TaskProgressStatusModule,
        TasksRoutingModule,
        WorkspaceUsersModule,
    ],
    providers: [TaskService],
})
export class TasksModule {}
