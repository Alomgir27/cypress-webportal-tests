/* eslint-disable no-continue */
import axios from 'axios';
import EmailMessageType from '../Enums/EmailMessageType';

const GetEmailMessage = async (typeOfMessage) => {
  /* Request list of latest emails */
  const emailListRequest = await axios.get(
    `${Cypress.env('apiUrl')}/mailtrap/inbox`,
    {
      params: {
        token: Cypress.env('mailTrapInboxToken'),
        inbox_id: Cypress.env('mailTrapInboxId'),
      },
    }
  );

  if (!emailListRequest?.data) {
    console.warn('No messages returned by the API');
    return null;
  }
  const returnData = null;
  /* Walk on messages array  */
  for (let i = 0; i < 3; i++) {
    const item = emailListRequest?.data[i];
    console.log(item);
    if (!item) continue;

    /* Requesting the MFA code */
    if (
      typeOfMessage === EmailMessageType.MFA_CODE &&
      item.subject.toLowerCase().includes('single-use code')
    ) {
      return item.message.split('\n\n')[0].replace(/[^0-9]/g, '');
    }
    if (
      typeOfMessage === EmailMessageType.INVITATION_USER_LINK &&
      item.subject.includes(
        'You have been invited to join the SimpleStudy Web Portal'
      )
    ) {
      return `${Cypress.env('baseUrl')}${
        item.message
          .split(`\n\n${Cypress.env('baseUrl')}`)
          .pop()
          .split('\n\n')[0]
      }`;
    }
    if (
      typeOfMessage === EmailMessageType.INVITATION_ORGANISATION_LINK &&
      item.subject.includes('Invitation to SimpleStudy Portal')
    ) {
      return `${Cypress.env('baseUrl')}${
        item.message
          .split(`\n\n${Cypress.env('baseUrl')}`)
          .pop()
          .split('\n\n')[0]
      }`;
    }
  }
  return null;
};

export default GetEmailMessage;
