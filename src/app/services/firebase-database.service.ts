import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

const routes: any = {
    userRole: (workspaceId: string, userId: string) => 'agenthos/workspaceUsers/' + workspaceId + '/users/' + userId + '/roleId'
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

    constructor(private _angularFireDatabase: AngularFireDatabase) { }

    /**
     * Get the user role from firebase
     * @param  workspaceId The workspace ID
     * @param  userId      The user ID
     * @return             The role ID
     */
    getUserRole(workspaceId: string, userId: string): Observable<any> {
        const route: string = routes.userRole(workspaceId, userId);
        const userRoleRef = this._angularFireDatabase.object(route);
        return userRoleRef.valueChanges();
    }
}
