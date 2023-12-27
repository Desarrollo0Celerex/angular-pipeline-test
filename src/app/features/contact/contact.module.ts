import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactCategoryModalComponent } from './components/contact-category-modal/contact-category-modal.component';
import { ContactTypeModalComponent } from './components/contact-type-modal/contact-type-modal.component';
import { CreateContactModalComponent } from './components/create-contact-modal/create-contact-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CountriesModule } from '@countries/countries.module';
import { WorkspaceModule } from '@workspace/workspace.module';
import { StateModule } from '@state/state.module';
import { ContactService } from './services/contact.service';
import { DuplicateContactModalComponent } from './components/duplicate-contact-modal/duplicate-contact-modal.component';
import { PoliciesModule } from '@policies/policies.module';

@NgModule({
    declarations: [
        ContactCategoryModalComponent,
        ContactTypeModalComponent,
        CreateContactModalComponent,
        DuplicateContactModalComponent,
    ],
    exports: [ContactCategoryModalComponent],
    imports: [
        CommonModule,
        ContactRoutingModule,
        CountriesModule,
        PoliciesModule,
        ReactiveFormsModule,
        StateModule,
        WorkspaceModule,
    ],
    providers: [ContactService],
})
export class ContactModule {}
