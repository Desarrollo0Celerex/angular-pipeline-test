import { Injectable } from '@angular/core';
import { ApiHttp } from '@core/http/api.http';
import { environment } from '@env/environment';
import { AuthService } from '@features-legacy/auth/services/auth.service';
import { User } from '@users/interfaces/user.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const ENDPOINTS: any = {
    workspaceUsers: (workspaceId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users`,
};

@Injectable()
export class WorkspaceUserService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(private _apiHttp: ApiHttp, private _authService: AuthService) {}

    getWorkspaceUsers(
        fields: string = '',
        page: number = 1,
        perPage: number = 1,
        sortBy: string = ''
    ): Observable<User[]> {
        return this._apiHttp
            .param('fields', fields)
            .param('page', page.toString())
            .param('perPage', perPage.toString())
            .param('sortBy', sortBy)
            .get(ENDPOINTS.workspaceUsers(this._workspaceId))
            .pipe(map((res: any) => res.items));
    }
}
