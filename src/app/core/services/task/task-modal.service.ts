import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TaskModalService {
    public modalCreateTask = new BehaviorSubject<{ canShowModal: boolean }>({
        canShowModal: false,
    });

    public show(): void {
        this.modalCreateTask.next({ canShowModal: true });
    }

    public hide(): void {
        this.modalCreateTask.next({ canShowModal: false });
    }
}
