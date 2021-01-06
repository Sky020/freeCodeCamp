/* global cy */

describe('A profile,', function() {
  describe('while viewing your own,', function() {
    before(() => {
      cy.visit('/');
      cy.contains("Get started (it's free)").click({ force: true });
      cy.contains('Update my account settings').click({ force: true });

      // set user settings to public to claim a cert
      cy.get('label:contains(Public)>input').each(el => {
        if (!/toggle-active/.test(el[0].parentElement.className)) {
          cy.wrap(el).click({ force: true });
          cy.wait(1000);
        }
      });

      // if honest policy not accepted
      cy.get('.honesty-policy button').then(btn => {
        if (btn[0].innerText === 'Agree') {
          btn[0].click({ force: true });
          cy.wait(1000);
        }
      });

      // fill in legacy front end form
      cy.get('#dynamic-legacy-front-end input').each(el => {
        cy.wrap(el)
          .clear({ force: true })
          .type('https://nhl.com', { force: true, delay: 0 });
      });

      // if "Save Progress" button exists
      cy.get('#dynamic-legacy-front-end').then(form => {
        if (form[0][10] && form[0][10].innerHTML === 'Save Progress') {
          form[0][10].click({ force: true });
          cy.wait(1000);
        }
      });

      // if "Claim Certification" button exists
      cy.get('#dynamic-legacy-front-end').then(form => {
        if (form[0][10] && form[0][10].innerHTML === 'Claim Certification') {
          form[0][10].click({ force: true });
          cy.wait(1000);
        }
      });

      // cy.get('#button-legacy-front-end')
      //   .contains('Show Certification')
      //   .click({ force: true });
    });

    it('should update certification without requiring reload', () => {
      cy.visit('/developmentuser');

      cy.contains('View Front End Certification').should('exist');
    });
  });
});
