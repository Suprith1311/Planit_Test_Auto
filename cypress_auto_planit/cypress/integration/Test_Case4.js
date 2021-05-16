/// <reference types="cypress" />

context('Test to validate errors on contact page', () => {
    beforeEach(() => {
        cy.visit('https://jupiter.cloud.planittesting.com/#/shop')
    })

    it('To enter the shop button and click on products and validate the value in cart ', async() => {
        //click on Stuff frog buy button 2 times 
        var numberOFStuffFrogs = 2;
        var numberOfFBunny = 5;
        var numberOfVBear = 3;
        for (var i = 0; i < numberOFStuffFrogs; i++) {
            cy.get('#product-2 > div > p > .btn').click();
            cy.wait(1000);
        }

        // click on Fluffy Bunny buy 5 times
        for (var j = 0; j < numberOfFBunny; j++) {
            cy.get('#product-4 > div > p > .btn').click();
            cy.wait(1000);

        }

        //click on Valentine Bear buy button 3 times
        for (var k = 0; k < numberOfVBear; k++) {
            cy.get('#product-7 > div > p > .btn').click();
            cy.wait(1000);

        }
        //click on cart button
        cy.get('#nav-cart > a').contains('Cart').click();
        //Validating for correct items in the cart Stuffed Frog, Fluffy bunny, Valentine bear
        cy.get('tbody > :nth-child(1) > :nth-child(1)').contains("Stuffed Frog");
        cy.get('tbody > :nth-child(2) > :nth-child(1)').contains("Fluffy Bunny");
        cy.get('tbody > :nth-child(3) > :nth-child(1)').contains("Valentine Bear");
        //Verifying the price of each items in the cart
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain', '$10.99');
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('contain', '$9.99');
        cy.get('tbody > :nth-child(3) > :nth-child(2)').should('contain', '$14.99');

           //verifying that each products sub total = product price * quantity for Stuff frog
        cy.get('tbody > :nth-child(1) > :nth-child(2)').then(($span) => {
            // $span is the object that the previous command yielded
            const priceOfSFrog =parseFloat($span.text().replace('$',''));
            var totalValueOfSfrogs = priceOfSFrog * numberOFStuffFrogs;
            cy.get('tbody > :nth-child(1) > :nth-child(4)').then(($total) => {
                const total = $total.text().replace('$','');
                assert.equal(totalValueOfSfrogs, total)
            })
        })
        //verifying that each products sub total = product price * quantity for funny bunny
         cy.get('tbody > :nth-child(2) > :nth-child(2)').then(($span) => {
            // $span is the object that the previous command yielded
            const priceOfBunny =parseFloat($span.text().replace('$',''));
            var totalValueOfBunny = priceOfBunny * numberOfFBunny;
            cy.get('tbody > :nth-child(1) > :nth-child(4)').then(($total) => {
                const total = $total.text().replace('$','');
                assert.equal(totalValueOfBunny, total)
            })
        })
         
        ////verifying that each products sub total = product price * quantity for valentine bear

         cy.get('tbody > :nth-child(3) > :nth-child(2)').then(($span) => {
            const priceOfVBear =parseFloat($span.text().replace('$',''));
            var totalValueOfVBear = priceOfVBear * numberOfVBear;
            cy.get('tbody > :nth-child(1) > :nth-child(4)').then(($total) => {
                const total = $total.text().replace('$','');
                assert.equal(totalValueOfVBear, total)
            })
        })

        let sum1;
        let sum2;
        let sum3;

        //validating that total =sum(Sub Totals)
            //taking the subtotal of stuff frog
        cy.get('tbody > :nth-child(1) > :nth-child(4)').then(($p1) => {
           
            sum1 = $p1.text();
            console.log(sum1);
        })
         // taking the subtotal of funny bunny
        cy.get('tbody > :nth-child(2) > :nth-child(4)').then(($p2) => {
            sum2 = $p2.text();
            console.log(sum2);
        })
        //taking the value of valentine bear
        cy.get('tbody > :nth-child(3) > :nth-child(4)').then(($p3) => {
            sum3 = $p3.text();
            console.log(sum3);
            //validating the sum of all the 3 items
           var s1 =  parseFloat(sum1.replace('$','')) ;
            var s2 =  parseFloat(sum2.replace('$','')) ;
            var s3 = parseFloat(sum3.replace('$',''));
            var tot = s1+s2+s3;
            cy.get('tfoot > :nth-child(1) > td').then(($Tsum) => {
                const count = parseFloat($Tsum.text().slice(7));
                assert.equal(tot,count)
            })
        })
        
        

    })
})