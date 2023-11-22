import { Component, OnInit } from '@angular/core';
import { CONTACT_TYPES, POLICY_STATUS } from '@constants/global';
import { FormatterHelper } from '@core/helpers/formatter.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { Policy } from '@core/interfaces/policy.interface';
import { PolicyService } from '@services/policy.service';
import * as moment from 'moment';

@Component({
    selector: 'agt-all-policies',
    templateUrl: './all-policies.page.html',
    styles: [],
})
export class AllPoliciesPage implements OnInit {
    policies: Policy[] = [];

    constructor(private _policyService: PolicyService) {}

    ngOnInit(): void {
        this._loadLastPolicies();
    }

    sendMessage(policy: Policy): void {
        const message = this._generateMessage(policy);
        const phoneNumber = `${policy.titularPhoneCode}${policy.titularPhoneNumber}`;
        const whatsappLink = FormatterHelper.formatWhatsappLink(
            phoneNumber,
            message
        );
        UtilitiesHelper.executeWhatsappLink(whatsappLink);
    }

    private _generateMessage(policy: Policy): string {
        const titularName =
            policy.contactTypeId === CONTACT_TYPES.PERSON
                ? FormatterHelper.formatPersonTitularName(policy.titularName)
                : 'representante de ' + policy.titularName;
        const helpNumber = FormatterHelper.formatPhone(
            policy.workspaceAdvisoryWhatsappCode,
            policy.workspaceAdvisoryWhatsappNumber
        );

        let message = `👋🏻 Hola ${titularName},
Te escribe Agenthos, el asistente virtual de ${policy.workspaceName}.

Este es un mensaje de cortesía para confirmarte que tu póliza de ${
            policy.insurerName
        }: (${
            policy.coveredProperty
        }) se emitió con éxito. A continuación te comparto los detalles más importantes de tu nueva póliza:

📄 No. Póliza: ${policy.policyNumber}
🏦 Aseguradora: ${policy.insurerName}
📆 Inicio Vigencia: ${FormatterHelper.formatShortDate(policy.validityStartDate)}
📆 Fin Vigencia: ${FormatterHelper.formatShortDate(policy.validityEndDate)}
💳 Plan de Pagos: ${policy.paymentPlanName}
💰 Prima Total: ${FormatterHelper.formatAmount(
            policy.policyAmount,
            policy.currencyName
        )}

En este enlace podrás descargar tu póliza en cualquier momento.
${policy.policyUrl}`;

        message = helpNumber
            ? `${message}

Recuerda que si tienes dudas, puedes solicitar ayuda en el número:

☎️ +${helpNumber}`
            : message;

        message += `

Por favor, no respondas este mensaje.`;
        return message;
    }

    private _loadLastPolicies(): void {
        const filterDate: string = moment()
            .subtract(8, 'days')
            .format('YYYY-MM-DD');
        const currentDate = moment().format('YYYY-MM-DD');
        const policyStatusIncomplete = POLICY_STATUS.INCOMPLETE;
        const page = 1;
        const perPage = 1000;
        const fields =
            'workspaceName,titularName,insurerName,insuranceName,policyNumber,contactTypeId,coveredProperty,validityStartDate,validityEndDate,paymentPlanName,policyAmount,currencyName,policyUrl,workspaceAdvisoryWhatsappCode,workspaceAdvisoryWhatsappNumber,titularPhoneCode,titularPhoneNumber';
        const filters = `createdAt[>=]${filterDate},createdAt[<=]${currentDate},validityStartDate[>=]${filterDate},validityStartDate[<=]${filterDate},policyStatusId[!=]${policyStatusIncomplete}`;
        this._policyService
            .getAllPolicies(page, perPage, fields, filters)
            .subscribe((res) => {
                this.policies = res.data.items;
            });
    }
}
