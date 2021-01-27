import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@interfaces/http-response.interface';
import { WorkspaceService } from '@services/workspace.service';

@Injectable()
export class UploadWorkspaceAvatarService {
    constructor(
        private _workspaceService: WorkspaceService,
    ) { }

    /**
     * Upload the workspace avatar
     * @param  image Image to upload
     * @return       Empty
     */
    uploadWorkspaceAvatar(image: string | null): Observable<HttpResponse> {
        const requestBody: Object = { image };
        return this._workspaceService.uploadWorkspaceAvatar(requestBody);
    }

}
