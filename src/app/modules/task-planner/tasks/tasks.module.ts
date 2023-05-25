import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as TaskPlannerSharedModule } from '../shared/shared.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksPage } from './tasks.page';
import { KpisComponent } from './components/kpis/kpis.component';
import { TasksService } from './tasks.service';

import { TaskStatusBackgroundPipe } from '../shared/pipes/task-status-background.pipe';
import { TaskStatusIconPipe } from '../shared/pipes/task-status-icon.pipe';
import { TaskStatusNamePipe } from '../shared/pipes/task-status-name.pipe';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';
import { MainActionComponent } from './components/main-action/main-action.component';
import { TitleComponent } from './components/title/title.component';
import { ListComponent } from './components/list/list.component';
import { ModalCreateTaskComponent } from './components/modal-create-task/modal-create-task.component';
import { ModalSelectTaskActionComponent } from './components/modal-select-task-action/modal-select-task-action.component';

@NgModule({
    declarations: [
        TasksPage,
        KpisComponent,
        SearchEngineComponent,
        MainActionComponent,
        TitleComponent,
        ListComponent,
        ModalCreateTaskComponent,
        ModalSelectTaskActionComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        TaskPlannerSharedModule,
        TasksRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        TaskStatusBackgroundPipe,
        TaskStatusIconPipe,
        TaskStatusNamePipe,
        TasksService,
    ],
})
export class TasksModule {}
