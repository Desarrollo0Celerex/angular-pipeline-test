import { Pipe, PipeTransform } from '@angular/core';
import { TASK_STATUS } from '@core/constants/settings';

@Pipe({
    name: 'taskStatusName',
    standalone: false
})
export class TaskStatusNamePipe implements PipeTransform {
    transform(taskStatusId?: number): string {
        let name: string;
        switch (taskStatusId) {
            case TASK_STATUS.PRIORITY:
                name = 'Prioritaria';
                break;
            case TASK_STATUS.DELAYED:
                name = 'Retrasada';
                break;
            case TASK_STATUS.URGENT:
                name = 'Urgente';
                break;
            case TASK_STATUS.EXPIRED:
                name = 'Vencida';
                break;
            case TASK_STATUS.STANDBY:
                name = 'En espera';
                break;
            case TASK_STATUS.FINISHED:
                name = 'Finalizada';
                break;
            case TASK_STATUS.IN_PROGRESS:
                name = 'En Progreso';
                break;
            default:
                name = '';
                break;
        }
        return name;
    }
}
