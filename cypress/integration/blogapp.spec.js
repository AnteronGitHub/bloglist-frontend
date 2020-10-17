describe('Blog app', function() {
  const testUser = {
    username: "testuser",
    password: "testpass"
  }
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('apiUrl')}/api/testing/reset`)
    cy.request('POST', `${Cypress.env('apiUrl')}/api/users`, testUser)
    cy.visit(`${Cypress.env('baseUrl')}/`)
  })

  it('Login from is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type(testUser.username)
      cy.get('input:last').type(testUser.password)
      cy.contains('login').click()
      cy.contains(`${testUser.username} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type(testUser.username)
      cy.get('input:last').type('rand')
      cy.contains('login').click()
      cy.contains('invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type(testUser.username)
      cy.get('input:last').type(testUser.password)
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      const testBlog = {
        title: "test blog",
        author: "test author",
        url: "http://example.com"
      }

      cy.contains('create').click()
      cy.get('#title').type(testBlog.title)
      cy.get('#author').type(testBlog.author)
      cy.get('#url').type(testBlog.url)
      cy.get('#submit').click()

      cy.contains(testBlog.title)
      cy.contains(testBlog.author)
      cy.contains('view')
    })
  })
})
