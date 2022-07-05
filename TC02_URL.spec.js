/// <reference types="Cypress" />

describe('Create a mark and unmark as favorite', () => {
    //Log in test
    it('Sign in', () => {
        cy.visit('https://example-page.com/#/login?_k=muyhl2')
        cy.title().should('eq','Conduit')
        cy.location('protocol').should('eq','https:')
        cy.get('input[type="email"]').type('admin@yahoo.com')
        cy.get('input[type="password"]').type('admin')
        cy.get('.btn').contains('Sign in').should('be.visible').click()
        cy.contains('Your Feed', {timeout:10000}).should('be.visible')

    })
    //Creat a Post
    it('Create a Post', () => {
        cy.contains('New Post').click()
        cy.hash().should('include','#/editor')
        cy.get('input[placeholder="Article Title"]').type('prova17')
        cy.get('input[placeholder="What\'s this article about?"]').type('prova2')
        cy.get('textarea[placeholder="Write your article (in markdown)"]').type('prova3')
        cy.contains('Publish Article').click()
        cy.url().should('include','article')
    })
    // Mark and unmark as favorite
    it('Mark and unmark as favorite', () => {
        cy.get('.nav-link').contains('valter').click()
        cy.contains('My Articles').should('be.visible')
        cy.get('.ion-heart').parent()
            .invoke('css', 'background-color')
            .then((bgcolor) => {
                console.log(bgcolor)
                if(bgcolor === 'rgba(0, 0, 0, 0)'){
                    cy.get('.ion-heart').click()                    
                }
            })
        cy.contains('Favorited Articles').click()
        cy.url().should('include','favorites')
        cy.get('#main').find('.article-preview').its('length').should('be.gt', 0)
        cy.get('.ion-heart').click()
        cy.reload()
        cy.contains('No articles are here... yet.').should('be.visible')
        cy.go('back')
    })
})

