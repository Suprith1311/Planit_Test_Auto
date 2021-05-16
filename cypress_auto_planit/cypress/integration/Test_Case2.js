/// <reference types="cypress" />

context('Test to validate errors on contact page', () => {
    beforeEach(() => {
      cy.visit('https://jupiter.cloud.planittesting.com/#/')
    })
  

//Happy path (All the fields are entered correctly and works as expected)
it('To enter the data in the madtaory fields and check that user is able to submit the form ', () => {
    // Click on contact button
    cy.get('#nav-contact > a').contains('Contact').click();
    var forename = "Micheal";
    var surname = "Scott";
    //Entering the firstname
    cy.get('#forename').type(forename)
    //Entering the surname
    cy.get('#surname').type(surname);
    //Entering email
    cy.get('#email').type(`${forename}.${surname}@gmail.com`);
    //Entering telephone number
    cy.get('#telephone').type('0123456789');
    //Entering the Message in a message box
    cy.get('#message') .type('Test the contact form');
    cy.get('.btn-contact').click();
    //waiting till the sending feedback diallogue box dissapeears
    cy.wait(15000)
    //Validating the success message
    cy.get('.alert').contains(`Thanks ${forename}, we appreciate your feedback.`)
  })

  
  //Happy path (All the fields are enetyred correctly and works as epxcted)
  it('To enter the data in the mandtaory fields and check that user is able to submit the form 5 times', () => {

    var forename = ["Micheal","Pam","Elon","David","Sundar"];
    var surname = ["Scott","Beesley","Musk","Beckham","Pichai"];
    //Running the test case 5 times to ensure 100% pass rate
    for(var i=0; i< forename.length; i++){
      cy.get('#nav-contact > a').contains('Contact').click();
      cy.get('#forename').type(forename[i]);
      cy.wait(3000);
      cy.get('#surname').type(surname[i]);
      cy.get('#email').type(`${forename[i]}.${surname[i]}@gmail.com`);
      cy.get('#telephone').type('0123456789');
      cy.get('#message') .type('Test the conatct form');
      cy.get('.btn-contact').click();
      //waiting till the sending feedback diallogue box dissapeears
      cy.wait(15000)
      cy.get('.alert').contains(`Thanks ${forename[i]}, we appreciate your feedback.`)
      cy.get('#nav-home > a').click();
    }
    cy.wait(3000);
  })

  //Leaving email as blank and filling in all the mandatory fields
  it('To enter the data and check the errors by leaving the Email field blank ', () => {
    //leaving some as blank field an testing
    cy.get('#nav-contact > a').contains('Contact').click();
    var forename = "Micheal";
    var surname = "Scott";
    cy.get('#forename').type(forename)
    cy.get('#surname').type(surname);
    cy.get('#telephone').type('0123456789');
    cy.get('#message') .type('Test the contact form');
    cy.get('.btn-contact').click();
    cy.get('.alert').contains("We welcome your feedback - but we won't get it unless you complete the form correctly.")
  })

  //Invalid email and validating the page
    it('User is able to submit the form with invlaid email ', () => {
      //leave some as blank and some fileld
      cy.get('#nav-contact > a').contains('Contact').click();
      var forename = "Micheal";
      var surname = "Scott";
      cy.get('#forename').type(forename)
      cy.get('#surname').type(surname);
      cy.get('#email').type(`${forename}.${surname}`);
      cy.get('#email-err').contains('Please enter a valid email');
      cy.get('#telephone').type('0123456789');
      cy.get('#message') .type('Test the conatct form');
      cy.get('.btn-contact').click();
      cy.wait(15000)
      cy.get('.alert').contains(`Thanks ${forename}, we appreciate your feedback.`)
    })

})
