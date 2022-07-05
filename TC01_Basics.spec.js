/// <reference types="Cypress" />

describe('Log in', () => {
    it('Sign in', () => {
        cy.visit('/#/login?_k=muyhl2')
        cy.get('input[type="email"]').type('admin@yahoo.com')
        cy.get('input[type="password"]').type('admin')
        cy.get('.btn').contains('Sign in').should('be.visible').click()

    })
})
