/// <reference types="Cypress" />

describe('Login', () => {
  it('Login Form', () => {
    cy.visit(`${Cypress.env('baseUrl')}/login`);

    cy.get('.content_area h2').first().should('have.text', 'Sign In');
    
    cy.get('[name="email"]')
      .clear()
      .type(Cypress.env('supportEmail'))
      .should('have.value', Cypress.env('supportEmail'));
    
    cy.get('[name="password"]')
      .clear()
      .type(Cypress.env('supportPassword'))
      .should('have.value', Cypress.env('supportPassword'));
    
    cy.get('form').submit();

    // Check if redirected away from login
    cy.location('pathname').should('not.contain', '/login');
  });
});
