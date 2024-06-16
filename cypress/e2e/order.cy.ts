describe('order modal',function() {
    beforeEach(function(){
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
      cy.intercept('POST', 'api/orders', {fixture: 'post_order.json'});
      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('test-refreshToken')
      );
      cy.setCookie('accessToken','12345');
      cy.viewport(1300,800);
      cy.visit('http://localhost:4000');
    })


    afterEach(function(){})
  
    it('should order burger work', function(){

      cy.get('[data-cy=bun-ingredients]').contains("Добавить").click();
      cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=finaly-cost]').click();
  
      cy.get('[data-cy=order-number]').contains('1001').should('exist');
  
      cy.get('#modals button[aria-lable="Закрыть"]').click();
      cy.get('[data-cy=order-number').should('not.exist');
  
      cy.get('[data-cy=constructor]')
        .contains('Ингредиент 1')
        .should('not.exist');
      cy.get('[data-cy=constructor]')
        .contains('Ингредиент 2')
        .should('not.exist');
      cy.get('[data-cy=constructor]')
        .contains('Ингредиент 3')
        .should('not.exist');
      });
  });
  
  