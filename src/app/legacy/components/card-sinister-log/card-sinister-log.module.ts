import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleModule } from '@directives/role/role.module';

import { CardSinisterLogComponent } from './card-sinister-log.component';

@NgModule({
    declarations: [CardSinisterLogComponent],
    exports: [CardSinisterLogComponent],
    imports: [CommonModule, RoleModule],
})
export class CardSinisterLogModule {}
