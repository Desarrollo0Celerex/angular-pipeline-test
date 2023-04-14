import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionWorkspaceInsuranceData } from '@interfaces/action-workspace-insurance-data.interface';
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
    @Input() licenseIndex: number | null = null;
    @Input() insuranceIndex: number | null = null;
    @Input() insuranceLicenseId: number = 0;
    @Input() workspaceLicenseId: number = 0;
    @Output() actionNotAllowed: EventEmitter<void> = new EventEmitter<void>();
    @Output() addWorkspaceInsurance: EventEmitter<ActionWorkspaceInsuranceData> = new EventEmitter<ActionWorkspaceInsuranceData>();
    @Output() removeWorkspaceInsurance: EventEmitter<ActionWorkspaceInsuranceData> = new EventEmitter<ActionWorkspaceInsuranceData>();

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    validateAction(): void {
        if(this.insuranceLicenseId > this.workspaceLicenseId) {
            this.actionNotAllowed.emit();
        } else {
            const data: ActionWorkspaceInsuranceData = {
                insuranceId: this.licenseInsurance!.insuranceId,
                licenseIndex: this.licenseIndex!,
                insuranceIndex: this.insuranceIndex!
            }
            if(this.licenseInsurance!.hasActiveLeadGenerator === false) {
                this.addWorkspaceInsurance.emit(data);
            } else {
                this.removeWorkspaceInsurance.emit(data);
            }
        }
    }
}
