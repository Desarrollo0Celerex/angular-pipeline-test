import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ROUTES_NAME } from '@constants/routes-name';

@Injectable({
  providedIn: 'root'
})
export class RoutingHistoryService {
    private _currentUrl: string;
    private _ignoredRoutes: string[];
    private _previousUrl: string;

    constructor(private _router: Router) {
        this._previousUrl = '';
        this._currentUrl = this._router.url;
        this._ignoredRoutes = [`/${ROUTES_NAME.notAuthenticated}`];
        this._generatePreviousUrl();
    }

    /**
     * Get the previous url
     * @return The previous url
     */
    getPreviousUrl(): string {
        return this._previousUrl;
    }

    /**
     * Generate the previous url
     */
    private _generatePreviousUrl(): void {
        this._router.events.pipe(
            filter( event => event instanceof NavigationStart )
        ).subscribe( (event: any) => {
            if(!this._ignoredRoutes.includes(this._currentUrl)) {
                this._previousUrl = this._currentUrl;
                this._currentUrl = event.url;
            }
        })
    }

}
