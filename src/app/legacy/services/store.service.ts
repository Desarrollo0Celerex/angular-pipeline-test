import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
    public isCompletedSiteCreator: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { }

    setSiteCreatorCompleted(): void {
        this.isCompletedSiteCreator.next(true);
    }
}
