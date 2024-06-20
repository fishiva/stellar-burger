const testUrl = 'http://localhost:4000';
const detailsIngredientSelector = 'Детали ингредиента';

describe('add ingredients to counstructor works correctly', function () {

  beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    // cy.intercept('GET', 'api/auth/user', {fixtire: 'user.json'}).as('gettingUser');
    cy.viewport(1300,800);
    cy.visit(testUrl);
  });

  it('should add bun', function() {
    cy.get('[data-cy=bun-ingredients]').contains("Добавить").click();
    cy.get('[data-cy=constructor-bun-1]')  
      .contains('Ингредиент 1 (верх)')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Ингредиент 1 (низ)')
      .should('exist');
  });
})
describe('modals works correctly', function() {
  beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300,800);
    cy.visit(testUrl);
  })

it('should work modal opening',function(){
  // cy.contains('Детали ингредиента').should('not.exist');
  cy.contains('Ингредиент 1').click();
  cy.contains(detailsIngredientSelector).should('exist');
  cy.get('#modals').contains('Ингредиент 1').should('exist');
});

it('should work modal closing on button', function() {
  cy.contains('Ингредиент 1').click();
  cy.contains(detailsIngredientSelector).should('exist');
  cy.get('#modals button[aria-lable="Закрыть"]').click();
  cy.contains(detailsIngredientSelector).should('not.exist');
})
})
