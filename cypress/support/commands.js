Cypress.Commands.add('login', (testUser) => {
  cy.request('POST', `${Cypress.env('apiUrl')}/api/login`, testUser)
    .then(({ body }) => {
      localStorage.setItem('user', JSON.stringify(body))
      cy.visit(`${Cypress.env('baseUrl')}/`)
    })
})
