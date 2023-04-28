import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class RoutingHistoryService {
    private _currentUrl: string;
    private _ignoredRoutes: string[];
    private _previousUrl: string;

    constructor(private _router: Router) {
        this._previousUrl = '';
        this._currentUrl = this._router.url;
        this._ignoredRoutes = ['errors/not-authenticated'];
        this._generatePreviousUrl();
    }

    getPreviousUrl(): string {
        return this._previousUrl;
    }

    private _generatePreviousUrl(): void {
        this._router.events
            .pipe(filter((event) => event instanceof NavigationStart))
            .subscribe((event: any) => {
                if (!this._ignoredRoutes.includes(this._currentUrl)) {
                    this._previousUrl = this._currentUrl;
                    this._currentUrl = event.url;
                }
            });
    }
}
