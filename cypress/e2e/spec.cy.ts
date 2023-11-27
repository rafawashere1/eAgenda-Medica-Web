describe('First access to the application', () => {
  it('Should redirect to login page', () => {
    cy.visit('/')

    cy.url().should('cointain', 'login')
  })
})
