import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { SharedModule } from '@shared/shared.module';

import { TaskStatusBackgroundPipe } from './pipes/task-status-background.pipe';
import { TaskStatusIconPipe } from './pipes/task-status-icon.pipe';
import { TaskStatusNamePipe } from './pipes/task-status-name.pipe';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksPage } from './pages/tasks/tasks.page';
import { TasksKpisComponent } from './components/tasks-kpis/tasks-kpis.component';
import { ModuleService } from './services/module.service';
import { TasksSearchEngineComponent } from './components/tasks-search-engine/tasks-search-engine.component';
import { TasksMainActionComponent } from './components/tasks-main-action/tasks-main-action.component';
import { TasksTitleComponent } from './components/tasks-title/tasks-title.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskComponent } from './components/task/task.component';
import { ModalSelectTaskActionComponent } from './components/modal-select-task-action/modal-select-task-action.component';
import { ModalCreateTaskComponent } from './components/modal-create-task/modal-create-task.component';
import { ModalSelectCalendarComponent } from './components/modal-select-calendar/modal-select-calendar.component';
import { ModalSyncCalendarComponent } from './components/modal-sync-calendar/modal-sync-calendar.component';

@NgModule({
    declarations: [
        TaskStatusBackgroundPipe,
        TaskStatusNamePipe,
        TasksPage,
        TasksKpisComponent,
        TasksSearchEngineComponent,
        TasksMainActionComponent,
        TasksTitleComponent,
        TasksListComponent,
        TaskComponent,
        ModalCreateTaskComponent,
        ModalSelectCalendarComponent,
        ModalSelectTaskActionComponent,
        ModalSyncCalendarComponent,
    ],
    exports: [
        ModalCreateTaskComponent,
        ModalSelectCalendarComponent,
        ModalSyncCalendarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgxQRCodeModule,
        ReactiveFormsModule,
        SharedModule,
        TasksRoutingModule,
    ],
    providers: [
        ModuleService,
        TaskStatusBackgroundPipe,
        TaskStatusIconPipe,
        TaskStatusNamePipe,
    ],
})
export class TasksModule {}
