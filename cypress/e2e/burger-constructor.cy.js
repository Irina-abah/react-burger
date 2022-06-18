describe('drag and drop is working', function() {

  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });
  
  // DND testing

  it('pick main', () => {
    cy.get('*[class^="ingredient_ingredient"]').contains('Говяжий метеорит (отбивная)').trigger("dragstart").trigger("dragleave");
    cy.get('*[class^="burder-constructor_container"]')
     .trigger("dragenter")
     .trigger("dragover")
     .trigger("drop")
     .trigger("dragend");
  });

  it('no order button only before bun is added', () => {
    cy.get('[data-cy="submit"]').find('button').should('not.exist');
  });

  it('pick bun', () => {
    cy.get('*[class^="ingredient_ingredient"]').first().trigger("dragstart").trigger("dragleave").as('bun');
    cy.get('*[class^="burder-constructor_container"]')
     .trigger("dragenter")
     .trigger("dragover")
     .trigger("drop")
     .trigger("dragend");
  });

  it('order button appears only after bun is added', () => {
    cy.get('[data-cy="submit"]').find('button').as('button');
    cy.get('@button').should('exist');
  });

  // open and close ingredient modal

  it('open modal', () => {
    cy.get('#ingredient').click();
    cy.get('*[class^="modal_container"]').should('exist');
  });

  it('close modal', () => {
    cy.get('*[class^="modal_icon"]').click();
    cy.get('*[class^="modal_container"]').should('not.exist');
  });

  // placing order

  it('auth before placing order', () => {
    cy.get('button').contains('Оформить заказ').click();
    cy.location('pathname').should('eq', '/login');
  });

  it('enter user data', () => {
    const email = 'bettt@bettt.com';
    const password = '12345678';
    cy.get('form').find('[class^="input_icon"]').first().click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
  });

  it('authorisation and placing order', () => {
    cy.get('button').contains('Войти').click();
    cy.location('pathname').should('eq', '/');
    cy.get('button').contains('Оформить заказ').click();
    cy.get('*[class^="modal_container"]').should('exist').as('order-modal');
    cy.get('@order-modal').contains('Ваш заказ начали готовить');
  });

  it('close modal', () => {
    cy.get('*[class^="modal_icon"]').click();
    cy.get('*[class^="modal_container"]').should('not.exist');
  });

});