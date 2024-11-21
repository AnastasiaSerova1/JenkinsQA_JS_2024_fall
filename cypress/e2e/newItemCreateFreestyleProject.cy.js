/// <reference types="cypress" />

const projectName = 'New Freestyle Project';
const projectDescription = 'New Freestyle Project Description';
const folderName = 'New Folder';
  
describe('US_00.001 | New item > Create Freestyle Project', function () {

    beforeEach(function () {
        cy.fixture('messages').then((messages) => {
            this.messages = messages;
        });
    });
    
    it('TC_00.001.03 | Create a new Freestyle Project using the "New Item" button from the Dashboard', function () {
        cy.get(':nth-child(1) > .task-link-wrapper > .task-link').first().click();
        cy.get('.jenkins-input').type('Sandra');
        cy.get('.label').first().click();
        cy.get('#ok-button').click();
        cy.get('.jenkins-submit-button').click();
        cy.get('h1').should('have.text', 'Sandra');
        cy.get('.model-link').should('contain', 'Sandra');
    });
    
    it('TC_00.001.02 | Verify a new freestyle project can be created from the Dahsboard page', function () {

        cy.get('a[href$="/newJob"]').click();
        cy.get('input#name').type(projectName);
        cy.get('#items li[class$="FreeStyleProject"]').click();
        cy.get('button[id="ok-button"]').click();
        cy.get('button[name="Submit"]').click();

        cy.get('#main-panel h1').should('have.text', projectName);
    
    });

    it('TC_00.001.04 | Verify a friendly reminder appeared when attempting to create a new Freestyle Project without a name', function () {

        cy.get('a[href$="/newJob"]').click();
        cy.get('#items li[class$="FreeStyleProject"]').click();
        
        cy.get('div[class$="validation-message"]').should('have.text', this.messages.newItem.emptyNameFieldReminder);

    });

    it('TC_00.001.05 | Verify a description can be added when creating a new Freestyle Project', function () {
        
        cy.get('a[href$="/newJob"]').click();
        cy.get('input#name').type(projectName);
        cy.get('#items li[class$="FreeStyleProject"]').click();
        cy.get('button[id="ok-button"]').click();
        cy.get('textarea[name="description"]').type(projectDescription);
        cy.get('button[name="Submit"]').click();

        cy.get('div#description').should('have.text', projectDescription);

    });

    it('TC_00.001.06 | Verify a new Freestyle Project can be created from a new Folder', function () {
        
        cy.get('a[href$="/newJob"]').click();
        cy.get('input#name').type(folderName);
        cy.get('#items li[class$="_Folder"]').click();
        cy.get('button[id="ok-button"]').click();
        cy.get('button[name="Submit"]').click();
        cy.get('a[href="newJob"]').click();
        cy.get('input#name').type(projectName);
        cy.get('#items li[class$="FreeStyleProject"]').click();
        cy.get('button[id="ok-button"]').click();
        cy.get('button[name="Submit"]').click();

        cy.get('#main-panel h1').should('have.text', projectName);
        cy.get('#main-panel').should('include.text', `${folderName}/${projectName}`);

    });

    it('TC_00.001-08 | Friendly messages are shown', function () {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('.hudson_model_FreeStyleProject').click();

        cy.get('#itemname-required').should('be.visible').and('have.text', '» This field cannot be empty, please enter a valid name');
        cy.get('#ok-button').should('be.disabled');
    });
  
    it('TC_00.001.07 | Verify that duplicate names are not accepted during project creation', function () {
        
        const duplicateNameError = `» A job already exists with the name ‘${projectName}’`
        
        cy.get('a[href$="/newJob"]').click();
        cy.get('input#name').type(projectName);
        cy.get('#items li').then((items) => {
            const randomIndex = Math.floor(Math.random() * items.length);
            cy.wrap(items).eq(randomIndex).click();
        });
        cy.get('button[id="ok-button"]').click();
        cy.get('button[name="Submit"]').click();
        cy.get('li[class="jenkins-breadcrumbs__list-item"]').eq(0).click();
        cy.get('a[href$="/newJob"]').click();
        cy.get('input#name').type(projectName);
        cy.get('#items li[class$="FreeStyleProject"]').click();

        cy.get('div[class$="validation-message"]').should('have.text', duplicateNameError);
        cy.get('button[id="ok-button"]')
          .should('be.disabled')
          .and('be.visible');

    });

    it('TC_00.001.10 | Create Freestyle Project using the "New Item" button', function () {
        cy.get('a:contains("New Item")').click();
        cy.get('input#name').type(projectName);
        cy.get('div').contains('Freestyle project').click();
        cy.get('button#ok-button').click();
        cy.get('button:contains("Save")').click();
        cy.get('a:contains("Dashboard")').click();

        cy.get('td a').should('contain', projectName);
    });

    it('TC_00.001.09 | Verify user can modify the default configuration during the creation by adding build trigger', function () {

        const scheduleBuild = 'H * * * *'

        cy.get('a[href$="/newJob"]').click();
        cy.get('input#name').type(projectName);
        cy.get('#items li[class$="FreeStyleProject"]').click();
        cy.get('button[id="ok-button"]').click();
        cy.get('.jenkins-section input[name="hudson-triggers-TimerTrigger"').check({force:true})
        cy.get('textarea[checkurl*="TimerTrigger"]').type(scheduleBuild)
        cy.get('button[name="Submit"]').click();

        cy.get('a').contains("Dashboard").click();
        cy.get('table[id="projectstatus"] tbody').contains(projectName).click()
        cy.get(':nth-child(6) > .task-link-wrapper > .task-link').click();
        cy.get('button[data-section-id="build-triggers"]').click()

        cy.get('.jenkins-section input[name="hudson-triggers-TimerTrigger"')
            .should('have.attr', 'checked')

        cy.get('textarea[checkurl*="TimerTrigger"]')
            .should('have.text', scheduleBuild)
    })
        
    it('TC_00.001-11 | Create Freestyle Project by clicking on Create a Job', function () {
        cy.get('a[href="newJob"]').click();
        cy.get('[id="name"]').type(projectName);
        cy.get('[class="hudson_model_FreeStyleProject"]').click();
        cy.get('[id="ok-button"]').click();
        cy.get('[name="Submit"]').click();

        cy.get('[id="main-panel"]').should('contain.text', projectName).and('be.visible');
    });

    it('TC_00.001.12 | Verify that space projects name is not accepted during project creation', function () {
        cy.get('a:contains("New Item")').click();
        cy.get('input#name').type(' ');
        cy.get('div').contains('Freestyle project').click();
        cy.get('button#ok-button').click();

        cy.get('#main-panel').should('include.text', 'Error')
                             .and('include.text', 'No name is specified');
    });
    
    it('TC_00.001.14 | Create Freestyle Project from the Dashboard Menu', function () {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('#name').type('New Project Name');
        cy.get('.hudson_model_FreeStyleProject').click();
        cy.get('#ok-button').click();
        cy.get('[name="Submit"]').click();
      
        cy.get('.job-index-headline').should('have.text', 'New Project Name');
    });
});
