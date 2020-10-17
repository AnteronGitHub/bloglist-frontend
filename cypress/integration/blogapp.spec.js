describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('apiUrl')}/api/testing/reset`)
    cy.visit(`${Cypress.env('baseUrl')}/`)
  })

  it('Login from is shown', function() {
    cy.contains('Log in to application')
  })
})
