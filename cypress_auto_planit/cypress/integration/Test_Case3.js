/// <reference types="cypress" />

context('Test to validate errors on contact page', () => {
    beforeEach(() => {
      cy.visit('https://jupiter.cloud.planittesting.com/#/')
    })
// Test condition to check the item in the cart
    it('To enter the shop button and click on products and validate the value in cart ', () => {
        // to click on shop button
        cy.get('#nav-shop > a').contains('Shop').click();
        //added wait because screen was taking few sec to load the animation
        cy.wait(3000);
        //click buy button 2 times on Funny cow product
        cy.get('#product-6 > div > p > .btn').click();
        cy.get('#product-6 > div > p > .btn').click();
        //click buy button one time on Fluffy Bunny 
        cy.get('#product-4 > div > p > .btn').click();
        //click on cart menu
        cy.get('#nav-cart > a').contains('Cart').click();
        //Verify the item Name on the cart for Funny cow and Fluffy bunny
        cy.get('tbody > :nth-child(1) > :nth-child(1)').contains("Funny Cow");
        cy.get('tbody > :nth-child(2) > :nth-child(1)').contains("Fluffy Bunny");
        //Verify the quantity of items in the cart
        cy.get(':nth-child(1) > :nth-child(3) > .input-mini').should('have.value', 2);
        cy.get(':nth-child(2) > :nth-child(3) > .input-mini').should('have.value', 1);
    })

})