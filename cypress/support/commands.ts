// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

declare namespace Cypress {
  interface Chainable {
    /**
     * @description Custom command to select DOM element by data-testid attribute.
     * @example cy.getByTestID('settings')
     */
    getByTestID (value: string): Chainable<Element>
    /**
     * @description Redirects to main page and creates an empty wallet for testing. Useful on starts of tests.
     * @example cy.createEmptyWallet()
     */
    createEmptyWallet (): Chainable<Element>
  }
}

Cypress.Commands.add('getByTestID', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args)
})

Cypress.Commands.add('createEmptyWallet', () => {
  cy.visit(Cypress.env('URL'))
  cy.getByTestID('playground_wallet_abandon').click()
})
