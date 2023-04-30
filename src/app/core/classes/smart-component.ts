import { Component, OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    template: '',
})
export abstract class SmartComponent implements OnDestroy {
    private readonly unsubscribe$ = new Subject<void>();

    ngOnDestroy() {
        this.unsubscribe();
    }

    protected untilComponentDestroy(): MonoTypeOperatorFunction<any> {
        return takeUntil(this.unsubscribe$);
    }

    private unsubscribe() {
        if (this.unsubscribe$.closed) {
            return;
        }
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
