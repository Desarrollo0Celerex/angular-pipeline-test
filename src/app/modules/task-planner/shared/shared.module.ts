import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatusNamePipe } from './pipes/task-status-name.pipe';
import { TaskStatusBackgroundPipe } from './pipes/task-status-background.pipe';
import { TaskStatusIconPipe } from './pipes/task-status-icon.pipe';
import { CardTaskComponent } from './components/card-task/card-task.component';

@NgModule({
    declarations: [
        CardTaskComponent,
        TaskStatusBackgroundPipe,
        TaskStatusIconPipe,
        TaskStatusNamePipe,
    ],
    exports: [
        CardTaskComponent,
        TaskStatusBackgroundPipe,
        TaskStatusIconPipe,
        TaskStatusNamePipe,
    ],
    imports: [CommonModule],
})
export class SharedModule {}
