import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Workspace } from '@interfaces/workspace.interface';
import { WorkspaceService } from '@services/workspace.service';

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
            .subscribe((res: HttpResponse) => {
                const workspace: Workspace = res.data;
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
