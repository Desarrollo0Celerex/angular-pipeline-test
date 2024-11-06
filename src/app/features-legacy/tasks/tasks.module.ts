import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { SharedModule } from '@shared/shared.module';
import { CountriesModule } from '@features-legacy/countries/countries.module';
import { TasksModule as NweTaskModule } from '@tasks/tasks.module';

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
import { ModalEditTaskComponent } from './components/modal-edit-task/modal-edit-task.component';
import { ModalHandleTaskComponent } from './components/modal-handle-task/modal-handle-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ModalShowTaskComponent } from './components/modal-show-task/modal-show-task.component';
import { ModalConfirmDeleteTaskComponent } from './components/modal-confirm-delete-task/modal-confirm-delete-task.component';
import { ModalSelectChannelsToShareTaskComponent } from './components/modal-select-channels-to-share-task/modal-select-channels-to-share-task.component';
import { ModalRequestContactInformationToShareTaskComponent } from './components/modal-request-contact-information-to-share-task/modal-request-contact-information-to-share-task.component';
import { TaskRecordPage } from './pages/task-record/task-record.page';
import { CalendarPage } from './pages/calendar/calendar.page';
import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { CalendarSettingsComponent } from './components/calendar-settings/calendar-settings.component';
import { TaskResultsPage } from './pages/task-results/task-results.page';
import { ResultsSearchEngineComponent } from './components/results-search-engine/results-search-engine.component';
import { ResultsListComponent } from './components/results-list/results-list.component';
import { TasksFinishedByRangePage } from './pages/tasks-finished-by-range/tasks-finished-by-range.page';
import { ContainerSelectStatsPeriodModule } from '@components/container-select-stats-period/container-select-stats-period.module';
import { ContentListModule } from '@components/content-list/content-list.module';
import { CardReportFinishedTasksComponent } from './components/card-report-finished-tasks/card-report-finished-tasks.component';
import { ModalSelectReportFormatModule } from '@components/modal-select-report-format/modal-select-report-format.module';

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
        ModalEditTaskComponent,
        ModalHandleTaskComponent,
        TaskListComponent,
        ModalShowTaskComponent,
        ModalConfirmDeleteTaskComponent,
        ModalSelectChannelsToShareTaskComponent,
        ModalRequestContactInformationToShareTaskComponent,
        TaskRecordPage,
        CalendarPage,
        CalendarListComponent,
        CalendarSettingsComponent,
        TaskResultsPage,
        ResultsSearchEngineComponent,
        ResultsListComponent,
        TasksFinishedByRangePage,
        CardReportFinishedTasksComponent,
    ],
    exports: [
        ModalCreateTaskComponent,
        ModalSelectCalendarComponent,
        ModalSyncCalendarComponent,
    ],
    imports: [
        CommonModule,
        CountriesModule,
        FormsModule,
        NweTaskModule,
        NgxQRCodeModule,
        ReactiveFormsModule,
        SharedModule,
        TasksRoutingModule,
        ContainerSelectStatsPeriodModule,
        ModalSelectReportFormatModule,
    ],
    providers: [
        ModuleService,
        TaskStatusBackgroundPipe,
        TaskStatusIconPipe,
        TaskStatusNamePipe,
    ],
})
export class TasksModule {}
