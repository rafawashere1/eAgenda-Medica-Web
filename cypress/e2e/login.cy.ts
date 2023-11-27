describe('Login Page', () => {
  it('Should display a notification for the empty fields', () => {
    cy.visit('/');

    cy.get('[data-cy=btnLogin]').click();

    cy.contains('Faltam campos a serem preenchidos!');
  });

  it('Should display a notification for the empty password', () => {
    cy.visit('/');
    
    cy.get('[data-cy=txtLogin]').type('rafateste', { force: true });
    cy.get('[data-cy=txtPassword]').type('Rafa@123');

    cy.get('[data-cy=btnLogin]').click();

    cy.url().should('contain', 'dashboard');
  })
})