import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

@Injectable()
export class UploadWorkspaceAvatarService {
    constructor(private _workspaceService: WorkspaceService) {}

    /**
     * Upload the workspace avatar
     * @param  image Image to upload
     * @return       Empty
     */
    uploadWorkspaceAvatar(image: string | null): Observable<void> {
        return this._workspaceService.uploadWorkspaceAvatar(image);
    }
}
