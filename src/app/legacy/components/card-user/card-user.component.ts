import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UserRole } from '@interfaces/user-role.interface';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'agt-card-user',
  templateUrl: './card-user.component.html',
  styles: [
  ]
})
export class CardUserComponent {
    @Input() user: User | null = null;
    @Input() index: number = 0;
    @Output() requestChangeRole: EventEmitter<UserRole> = new EventEmitter<UserRole>();

    changeRole(): void {
        if(!!this.user) {
            const userRole: UserRole = {
                userId: this.user.userId,
                roleId: this.user.roleId,
                index: this.index
            }
            this.requestChangeRole.emit(userRole);
        }
    }
}
