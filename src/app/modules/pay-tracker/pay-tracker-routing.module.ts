import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PAY_TRACKER_ROUTES } from '@configs/routes.config';

import { PaymentListPage } from './pages/payment-list/payment-list.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: `/${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.PAYMENTS}`,
        pathMatch: 'full',
    },
    {
        path: PAY_TRACKER_ROUTES.PAYMENTS,
        component: PaymentListPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PayTracketRoutingModule {}
