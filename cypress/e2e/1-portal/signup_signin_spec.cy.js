/// <reference types="Cypress" />
  describe('Validate Signup and Sign in', () => {
    it('Check Sign up', () => {
        cy.visit('https://simplestudy.cloud/');
        cy.get('a.getPremium').click({ multiple: true, force: true });
        cy.get('div.in-box.checkmark[data-id="GB"]').click();
        cy.get('button.check-answer-btn').click();
        cy.get('.right h3').contains('A-Level').click();
        cy.get('button.check-answer-btn').click();
        cy.get('.in-box h3').contains('Psychology').click();
        cy.get('button.check-answer-btn').should('be.visible').click();
    
        // Generate a unique email address based on timestamp
        const timestamp = new Date().getTime();
        const email = `testuser${timestamp}@gmail.com`;
    
        // Fill in the sign-up form with the generated email address
        cy.get('#fname').type('Arifuz Zaman Antor');
        cy.get('#email').type(email);
        cy.get('#password1').type('testPass2024');
        cy.get('.check-answer-btn').click();
        cy.wait(2000);
    });    
    it('Check Sign in', () => {
      cy.visit('https://simplestudy.cloud/login')
      cy.get('#email').type("support@simplestudy.ie")
      cy.get('#pwd').type("upload123")
      cy.get('button').click()
      cy.url().should('eq', 'https://simplestudy.cloud/account/my_space');
      cy.get('#quiz-streaks-popup > .popup-cont > .close').click()
    });  
  });
  