/// <reference types="cypress" />


describe("US_00.002 | New Item > Create Pipeline Project", () => {


  let projectName = "New Pipeline"


  it("New Item > Create Pipeline Project | Special characters are not allowed in the project name", () => {
    cy.get(".task-link-text").contains("New Item").click({ force: true });
    cy.get("#name.jenkins-input").type("New<>Name");
    cy.get("#itemname-invalid")
      .should("have.text", "» ‘<’ is an unsafe character")
      .and("have.css", "color", "rgb(230, 0, 31)");
  });

  it('TC_00.002.04 | Create Pipeline Project with an empty item name field', () => {
    cy.get('span').contains("New Item").click();
    cy.get('.label').contains('Pipeline').click();

    cy.get('#itemname-required').should('have.text', '» This field cannot be empty, please enter a valid name')
      .should('have.css', 'color', 'rgb(230, 0, 31)');
  })


  it("TC_00.002.03 | Verify redirection to Configure page", () => {

    cy.get('a[href$="/newJob"]').click();
    cy.get('input#name').type(projectName);
    cy.get('#items li[class$="WorkflowJob"]').click();
    cy.get('button[id="ok-button"]').click();
        
    cy.url().should('include', '/configure')

  })

  it('TC_00.002.05 | Create Pipeline Project with an already existing name of a project', () => {
    cy.log('Precondition: create Pipline project');
    cy.get('span').contains("New Item").click();
    cy.get('input[name="name"]').type(projectName).click();
    cy.get('.label').contains('Pipeline').click();
    cy.get('#ok-button').click();
    cy.get('button').contains('Save').click();
    cy.get('a').contains("Dashboard").click();

    cy.log('Create project with an existing name');
    cy.get('span').contains("New Item").click();
    cy.get('input[name="name"]').type(projectName).click;

    cy.get('#itemname-invalid').should('have.text', `» A job already exists with the name ‘${projectName}’`)
        .and('have.css', 'color', 'rgb(230, 0, 31)');
    cy.get('#ok-button').should('be.disabled');
})

});