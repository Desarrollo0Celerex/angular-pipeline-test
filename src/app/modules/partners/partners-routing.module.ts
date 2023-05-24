import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PARTNERS_ROUTES } from '@configs/routes.config';

import { PaymentsPendingByRangePage  } from './pages/payments-pending-by-range/payments-pending-by-range.page';

const routes: Routes = [
    /* {
        path: PARTNERS_ROUTES.PAYMENTS_APPLIED_BY_RANGE(':partnerId', ':rangeStart', ':rangeEnd'),
        component: PaymentsPendingByRangePage,
    }, */
    {
        path: PARTNERS_ROUTES.PAYMENTS_PENDING_BY_RANGE(':partnerId', ':rangeStart', ':rangeEnd'),
        component: PaymentsPendingByRangePage,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
