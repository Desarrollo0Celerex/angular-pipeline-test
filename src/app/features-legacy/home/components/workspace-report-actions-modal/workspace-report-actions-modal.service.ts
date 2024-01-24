import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WorkspaceReportActionsModalService {
    public workspaceReportActionsModal$ = new Subject<void>();

    public openModal(): void {
        this.workspaceReportActionsModal$.next();
    }
}
