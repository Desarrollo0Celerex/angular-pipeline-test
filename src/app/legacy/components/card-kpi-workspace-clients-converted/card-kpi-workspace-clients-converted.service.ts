import { Injectable } from '@angular/core';

import { CLIENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { ClientService } from '@services/client.service';

@Injectable()
export class CardKpiWorkspaceClientsConvertedService {
    totalWorkspaceClientsConverted: number = 0;

    constructor(private _clientService: ClientService) {}

    loadTotalWorkspaceClientsConverted(range: RangeData): void {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'clientStatusId',
            [
                CLIENT_STATUS.OCCASIONAL,
                CLIENT_STATUS.FREQUENT,
                CLIENT_STATUS.INFLUENTIAL,
            ]
        );
        this._clientService
            .getTotalClients(
                filters,
                range.rangeField,
                range.rangeStart,
                range.rangeEnd
            )
            .subscribe((res: number) => {
                this.totalWorkspaceClientsConverted = res;
            });
    }
}
