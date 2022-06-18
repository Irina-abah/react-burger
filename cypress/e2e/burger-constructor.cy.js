describe('drag and drop is working', function() {

  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });
  
  // dnd testing

  it('pick the first item', () => {
    cy.get('#ingredient').first().trigger("dragstart").trigger("dragleave");
  });

  it('drag that item to the destination', () => {
    cy.get('*[class^="burder-constructor_container"]')
     .trigger("dragenter")
     .trigger("dragover")
     .trigger("drop")
     .trigger("dragend");
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


});