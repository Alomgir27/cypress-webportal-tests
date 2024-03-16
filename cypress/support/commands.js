/* eslint-disable camelcase */
import EmailMessageType from './Enums/EmailMessageType';
import getEmailMessage from './Helpers/GetEmailMessage';
import sleep from './Helpers/Sleep';

Cypress.Commands.add('getAndSetToken', (email, password) => {
  Cypress.log({
    message: 'Requests token and sets in local storage.',
    displayName: 'GetToken',
  });
  cy.request({
    url: `${Cypress.env('apiUrl')}/login`,
    method: 'POST',
    headers: {
      'Is-Cypress': true,
    },
    body: {
      email,
      password,
      remember: 1,
    },
  }).then(async (loginRequest) => {
    /* If MFA Code is requested, get it from mail trap  */
    if (loginRequest?.body?.error_code === 10000) {
      sleep(7000);
      Cypress.log({
        message: 'Getting MFA code from email.',
        displayName: 'GetMFACode',
      });

      /* Get MFA Code */
      const code = await getEmailMessage(EmailMessageType.MFA_CODE);
      Cypress.log({
        message: `Submitting MFA Code:${code}`,
        displayName: 'SubmittingMFACode',
      });

      cy.request({
        url: `${Cypress.env('apiUrl')}/two-fa`,
        method: 'POST',
        headers: {
          'Is-Cypress': true,
        },
        body: {
          email,
          password,
          code: Number(code),
        },
      }).then((response) => {
        const { access_token } = response.body;
        localStorage.setItem('simplestudy_token', access_token);
      });
    } else {
      /*  MFA Code NOT requested */
      const { access_token } = loginRequest.body;
      localStorage.setItem('simplestudy_token', access_token);
    }
  });
});
