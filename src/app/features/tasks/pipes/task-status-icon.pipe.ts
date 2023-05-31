import { Pipe, PipeTransform } from '@angular/core';
import { TASK_STATUS } from '@core/constants/settings';

@Pipe({
    name: 'taskStatusIcon',
})
export class TaskStatusIconPipe implements PipeTransform {
    transform(taskStatusId?: number): string {
        let name: string;
        switch (taskStatusId) {
            case TASK_STATUS.PRIORITY:
                name = 'mdi-alarm-check';
                break;
            case TASK_STATUS.DELAYED:
                name = 'mdi-alarm';
                break;
            case TASK_STATUS.URGENT:
                name = 'mdi-update';
                break;
            case TASK_STATUS.EXPIRED:
                name = 'mdi-alert-circle-outline';
                break;
            default:
                name = '';
                break;
        }
        return name;
    }
}
