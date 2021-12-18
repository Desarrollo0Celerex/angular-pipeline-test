import { Injectable } from '@angular/core';

import { CLIENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ClientService } from '@services/client.service';

@Injectable()
export class CardKpiActiveClientsService {
    totalActiveClients: number = 0;

    constructor(private _clientService: ClientService) { }

    loadTotalActiveClients(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL]);
        this._clientService.getTotalClients(filters).subscribe((res: number) => {
            this.totalActiveClients = res;
        })
    }
}
