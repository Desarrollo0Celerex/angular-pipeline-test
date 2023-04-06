import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LicenseInsurance } from '@interfaces/license-insurance.interface';

declare var PopoverPlugin: any;

@Component({
  selector: 'agt-card-license-insurance',
  templateUrl: './card-license-insurance.component.html',
  styles: [
  ]
})
export class CardLicenseInsuranceComponent implements OnInit {
    @Input() licenseInsurance: LicenseInsurance | null = null;
    @Input() insuranceLicenseId: number = 0;
    @Input() workspaceLicenseId: number = 0;
    @Output() actionNotAllowed: EventEmitter<void> = new EventEmitter<void>();
    @Output() addWorkspaceInsurance: EventEmitter<number> = new EventEmitter<number>();
    @Output() removeWorkspaceInsurance: EventEmitter<number> = new EventEmitter<number>();

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    updateLeadGeneratorStatus(event: any): void {
        if(event.target.checked === true) {
            this.addWorkspaceInsurance.emit(this.licenseInsurance!.insuranceId);
            this.licenseInsurance!.hasActiveLeadGenerator = true;
        } else {
            this.removeWorkspaceInsurance.emit(this.licenseInsurance!.insuranceId);
            this.licenseInsurance!.hasActiveLeadGenerator = false;
        }
    }

    validateAction(): void {
        if(this.insuranceLicenseId > this.workspaceLicenseId) {
            this.actionNotAllowed.emit();
        }
    }
}
