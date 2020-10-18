Cypress.Commands.add('login', (testUser) => {
  cy.request('POST', `${Cypress.env('apiUrl')}/api/login`, testUser)
    .then(({ body }) => {
      localStorage.setItem('user', JSON.stringify(body))
      cy.visit(`${Cypress.env('baseUrl')}/`)
    })
})

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: `${Cypress.env('apiUrl')}/api/blogs`,
    method: 'POST',
    body: blog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  })

  cy.visit(`${Cypress.env('baseUrl')}/`)
})
