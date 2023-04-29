import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Workspace } from '@core/interfaces/workspace.interface';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

@Injectable()
export class ResumeService {
    isContentLoaded: boolean = false;
    isCompletedCardium: boolean = false;
    isCompletedFacebook: boolean = false;
    isCompletedInstagram: boolean = false;
    isCompletedTwitter: boolean = false;
    isCompletedLinkedin: boolean = false;
    isCompletedTiktok: boolean = false;

    constructor(private _workspaceService: WorkspaceService) {}

    loadWorkspace(): void {
        const fields: string =
            'cardiumUrl,facebookUrl,instagramUrl,twitterUrl,linkedinUrl,tiktokUrl';
        this._workspaceService
            .getWorkspace(fields)
            .subscribe((res: Workspace) => {
                const workspace: Workspace = res;
                this.isCompletedCardium =
                    workspace.cardiumUrl !== null ? true : false;
                this.isCompletedFacebook =
                    workspace.facebookUrl !== null ? true : false;
                this.isCompletedInstagram =
                    workspace.instagramUrl !== null ? true : false;
                this.isCompletedTwitter =
                    workspace.twitterUrl !== null ? true : false;
                this.isCompletedLinkedin =
                    workspace.linkedinUrl !== null ? true : false;
                this.isCompletedTiktok =
                    workspace.tiktokUrl !== null ? true : false;
                this.isContentLoaded = true;
            });
    }
}
