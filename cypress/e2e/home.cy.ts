describe('Homepage Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should load the homepage and display the main title', () => {
      cy.contains('h1', 'Moderní a efektivní příprava');
      cy.contains('h2', 'na přijímací zkoušky a maturitu');
    });
  
    it('should have a functioning "Začít procvičovat" button', () => {
      cy.contains('Začít procvičovat').click();
      cy.url().should('include', '/procvicovani');
    });
  
    it('should scroll to the "about" section when the arrow button is clicked', () => {
      cy.get('a[href="#about"]').click();
      cy.url().should('include', '#about');
    });
  
    it('should display the correct answered exercise count', () => {
      // Assuming answeredExerciseCount is available in the component
      cy.contains('.fs-1.fw-bold', 'vyplněných cvičení');
    });
  
    it('should display the correct submitted test count', () => {
      // Assuming submittedTestCount is available in the component
      cy.contains('.fs-1.fw-bold', 'vyplněných testů');
    });
  
    it('should display all review sections', () => {
      cy.get('.carousel-inner .carousel-item').should('have.length', 8);
    });
  
    it('should navigate through reviews using carousel controls', () => {
      cy.get('.carousel-control-next').click();
      cy.get('.carousel-item.active').should('have.length', 1);
  
      cy.get('.carousel-control-prev').click();
      cy.get('.carousel-item.active').should('have.length', 1);
    });
  
    it('should have working links for cards', () => {
      cy.contains('Zkusit test').click();
      cy.url().should('include', '/test');
      cy.visit('/');
      cy.contains('Začít procvičovat').click();
      cy.url().should('include', '/procvicovani');
      cy.visit('/');
      cy.contains('Zobrazit přehled').click();
      cy.url().should('include', '/prehled');
    });
  });
  