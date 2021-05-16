/// <reference types="cypress" />

context('Test to validate errors on contact page', () => {
  beforeEach(() => {
    cy.visit('https://jupiter.cloud.planittesting.com/#/')
  })

  
  
  it('To check the conatct page for madatroy errors and vlaidting that the errors gone', () => {
    //leave all the mandatory fields as blank
    cy.get('#nav-contact > a').contains('Contact').click();
    // click on submit button of contact page
    cy.get('.btn-contact').click();
    //Validate the error message after the submit button
    cy.get('.alert').contains("We welcome your feedback - but we won't get it unless you complete the form correctly.")
  })

  //Happy path (All the fields are entered correctly and works as expected)
  it('To enter the data in the mandtaory fields and check that  the error message is gone ', () => {
    //click on contact button
    cy.get('#nav-contact > a').contains('Contact').click();
    var forename = "Micheal";
    var surname = "Scott";
    //Enter the data in First anme
    cy.get('#forename').type(forename)
    //Enter the data in Surname
    cy.get('#surname').type(surname);
    //Enter the Email
    cy.get('#email').type(`${forename}.${surname}@gmail.com`);
    //Entering the input data for telephone number
    cy.get('#telephone').type('0123456789');
    //Enter the data in message box
    cy.get('#message') .type('Test the contact form');
    //Validating the Error message is gone once the data is entered into the form
    cy.contains("We welcome your feedback - but we won't get it unless you complete the form correctly.").should('not.exist')  
  })

})


