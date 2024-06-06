describe('Auth Component', () => {
    beforeEach(() => {
        // Visit the auth page
        cy.visit('/auth');
    });

    it('should display the login form by default', () => {
        cy.get('.card-header').contains('Login');
        cy.get('.card-title').contains('Přihlášení do systému DIDAKTAKY-ONLINE');
        cy.get('form').within(() => {
            cy.get('input[type="email"]').should('exist');
            cy.get('input[type="password"]').should('exist');
            cy.get('button').contains('Přihlásit');
        });
    });

    it('should navigate to the registration form when "Registrace" link is clicked', () => {
        cy.get('a').contains('Registrace').click();
        cy.get('.card-header').contains('Registrace');
        cy.get('.card-title').contains('Registrace do systému DIDAKTAKY-ONLINE');
        cy.get('form').within(() => {
            cy.get('input[type="email"]').should('exist');
            cy.get('input[type="password"]').should('exist');
            cy.get('button').contains('Registrovat');
        });
    });

    it('should allow user to switch back to login form', () => {
        cy.get('a').contains('Registrace').click();
        cy.get('a').contains('Přihlášení').click();
        cy.get('.card-header').contains('Login');
        cy.get('form').within(() => {
            cy.get('input[type="email"]').should('exist');
            cy.get('input[type="password"]').should('exist');
            cy.get('button').contains('Přihlásit');
        });
    });

    it('should handle login form submission', () => {
        cy.get('form').within(() => {
            cy.get('input[type="email"]').type('test@example.com');
            cy.get('input[type="password"]').type('password');
            cy.get('button').contains('Přihlásit').click();
        });

        // Assuming login redirects to home page
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('should handle registration form submission', () => {
        cy.get('a').contains('Registrace').click();
        cy.get('form').within(() => {
            cy.get('input[type="email"]').type('newuser@example.com');
            cy.get('input[type="password"]').type('password');
            cy.get('button').contains('Registrovat').click();
        });

        // Assuming registration redirects to home page
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
});
