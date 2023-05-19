import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactFileDataSend } from '@interfaces/contact-file-data-send.interface';

import { ContactFileService } from '@services/contact-file.service';

@Injectable()
export class ModalConfirmDeleteContactFileService {

    constructor(private _contactFileService: ContactFileService) { }

    /**
     * Delete the contact file
     * @param  contactFileData The contact file data
     * @return                 Notification of action done
     */
    deleteContactFile(contactFileData: ContactFileDataSend): Observable<void> {
        return this._contactFileService.deleteContactFile(contactFileData);
    }
}
