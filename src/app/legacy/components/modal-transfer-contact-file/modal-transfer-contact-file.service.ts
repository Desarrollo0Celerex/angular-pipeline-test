import { Injectable } from '@angular/core';

import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { ContactFileService } from '@services/contact-file.service';

@Injectable()
export class ModalTransferContactFileService {
    fileUrl: string = '';

    constructor(private _contactFileService: ContactFileService) {}

    /**
     * Load the contact file
     * @param contactFileData The contact file data
     */
    loadContactFile(contactFileData: ContactFileDataSend): void {
        const fields: string = 'fileUrl';
        this._contactFileService
            .getContactFile(contactFileData, fields)
            .subscribe((res: HttpResponse) => {
                this.fileUrl = res.data.fileUrl;
            });
    }
}
