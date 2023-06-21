describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword',
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#loginBtn').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#loginBtn').click()

      cy.get('#alert')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Test User logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpassword' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://testblog.com')
      cy.get('#createBtn').click()

      cy.get('#alert')
        .should('contain', 'A new blog Test Blog by Test Author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains('Test Blog - Test Author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test Blog',
          author: 'Test Author',
          url: 'http://testblog.com',
        })
      })

      it('it can be liked', function () {
        cy.contains('Test Blog - Test Author').parent().find('#viewBtn').click()
        cy.get('#likeBtn').click()
        cy.contains('likes 1')
      })

      it('it can be deleted', function () {
        cy.get('#viewBtn').click()
        cy.get('#removeBtn').click()
        cy.get('html').should('not.contain', 'Test Blog - Test Author')
      })

      it('it can be deleted by the user who created it', function () {
        cy.get('#logoutBtn').click()
        const user = {
          name: 'Test User 2',
          username: 'testuser2',
          password: 'testpassword2',
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.login({ username: 'testuser2', password: 'testpassword2' })

        cy.get('#viewBtn').click()
        cy.get('#blog-details').should('not.contain', 'remove')
      })

      it.only('blogs are ordered by likes', function () {
        cy.createBlog({
          title: 'Blog with most likes',
          author: 'Test Author 2',
          url: 'http://testblog2.com',
          likes: 10,
        })

        cy.get('.blog').eq(0).should('contain', 'Blog with most likes')
        cy.get('.blog').eq(1).should('contain', 'Test Blog')
      })
    })
  })
})
