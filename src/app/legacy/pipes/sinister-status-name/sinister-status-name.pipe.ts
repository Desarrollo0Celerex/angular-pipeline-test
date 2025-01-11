import { Pipe, PipeTransform } from '@angular/core';

import { SINISTER_STATUS } from '@constants/global';

@Pipe({
    name: 'sinisterStatusName',
    standalone: false
})
export class SinisterStatusNamePipe implements PipeTransform {

    transform(sinisterStatusId: number): string {
        let sinisterStatusName: string = '';
        switch(sinisterStatusId) {
            case SINISTER_STATUS.RECENT:
            case SINISTER_STATUS.PENDING:
            case SINISTER_STATUS.UNFINISHED:
            case SINISTER_STATUS.CONFLICTIVE:
                sinisterStatusName = 'Abierto';
            break;

            default:
                sinisterStatusName = 'Cerrado';
        }
        return sinisterStatusName;
    }
}
