/// <reference types="Cypress" />

describe("Create a mark and unmark as favorite", () => {
  //Log in test
  it.only("Sign in", () => {
    cy.visit("https://react-redux.realworld.io/#/login?_k=muyhl2");
    cy.title().should("eq", "Conduit");
    cy.location("protocol").should("eq", "https:");
    cy.get('input[type="email"]').type('valter.xhelili@yahoo.com')
    cy.get('input[type="password"]').type('natanael')
    cy.get('.btn').contains('Sign in').should('be.visible').click()

    cy.get("form").within(($form) => {
      // cy.get() will only search for elements within form, not within document
      cy.get('input[type = "email"').type("valter.xhelili@yahoo.com");
      cy.get('input[type = "password"]').type("natanael");
      cy.root().submit(); //submit the form yealded from 'within'
    });

    cy.contains("Your Feed", { timeout: 10000 }).should("be.visible");
  });

  //Creat a Post
  it("Create a Post", () => {
    //cy.contains('New Post').click()
    cy.get("ul.navbar-nav").children().contains("New Post").click();
        
    cy.hash().should("include", "#/editor");
    cy.get("form").within(($form) => {
      cy.get('input').first().type("prova13");
      cy.get('input').eq(1).type("prova2");
      cy.get('textarea').last().type(
        "prova3")
        });
    cy.url().should("include", "article");
  });


  // Mark and unmark as favorite
  it("Mark and unmark as favorite", () => {
    cy.get(".nav-link").contains("valter").click();
    cy.contains("My Articles").should("be.visible");
    cy.get(".ion-heart")
      .parent()
      .invoke("css", "background-color")
      .then((bgcolor) => {
        console.log(bgcolor);
        if (bgcolor === "rgba(0, 0, 0, 0)") {
          cy.get(".ion-heart").click();
        }
      });
    cy.contains("Favorited Articles").click();
    cy.url().should("include", "favorites");
    cy.get("#main").find(".article-preview").its("length").should("be.gt", 0);
    cy.get(".ion-heart").click();
    cy.reload();
    cy.contains("No articles are here... yet.").should("be.visible");
    cy.go("back");
  });
});
