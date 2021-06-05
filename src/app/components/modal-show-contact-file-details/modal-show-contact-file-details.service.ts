import { Injectable } from '@angular/core';

import { ContactFile } from '@interfaces/contact-file.interface';
import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ContactFileService } from '@services/contact-file.service';

@Injectable()
export class ModalShowContactFileDetailsService {
    contactFile: ContactFile | null = null;

    constructor(private _contactFileService: ContactFileService) { }

    /**
     * Load the contact file
     * @param contactFileData The contact file data
     */
    loadContactFile(contactFileData: ContactFileDataSend): void {
        const fields: string = 'contactFileId,fileName,createdAt,updatedAt,fileSize';
        this._contactFileService.getContactFile(contactFileData, fields).subscribe((res: HttpResponse) => {
            this.contactFile = res.data;
        })
    }

}
