import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScanningService {
    public isScanning: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /**
     * Show the scanning
     */
    public show(): void {
        this.isScanning.next(true);
    }

    /**
     * Hide the scanning
     */
    public hide(): void {
        this.isScanning.next(false);
    }
}
