import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {
    public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    public show(): void {
        this.isLoading.next(true);
    }

    public hide(): void {
        this.isLoading.next(false);
    }
}
