import { Pipe, PipeTransform } from '@angular/core';
import { TASK_STATUS } from '@configs/constants.config';

@Pipe({
    name: 'taskStatusBackground',
})
export class TaskStatusBackgroundPipe implements PipeTransform {
    transform(taskStatusId?: number): string {
        let name: string;
        switch (taskStatusId) {
            case TASK_STATUS.PRIORITY:
                name = 'success';
                break;
            case TASK_STATUS.DELAYED:
                name = 'info';
                break;
            case TASK_STATUS.URGENT:
                name = 'warning';
                break;
            case TASK_STATUS.EXPIRED:
                name = 'danger';
                break;
            default:
                name = '';
                break;
        }
        return name;
    }
}
