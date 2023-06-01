import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '@features/tasks/interfaces/task.interface';

@Component({
    selector: 'agt-task-list',
    templateUrl: './task-list.component.html',
    styles: [],
})
export class TaskListComponent {
    @Input() isLoadedContent: boolean = false;
    @Input() isLoadingContent: boolean = false;
    @Input() taskStatusId: number = 0;
    @Input() tasks: Task[] = [];
    @Input() totalItems: number = 0;
    @Input() noResultsMessage: string = '';
    @Input() noResultsDetails: string = '';
    @Input() noResultsButtonLabel: string = '';
    @Output() doNoResultsAction = new EventEmitter<void>();
    @Output() loadMoreContents = new EventEmitter<void>();

    requestDoNoResultsAction(): void {
        this.doNoResultsAction.emit();
    }

    requestLoadMoreContents(): void {
        this.loadMoreContents.emit();
    }

    trackById(index: number, task: Task): string {
        return task.taskId;
    }
}
