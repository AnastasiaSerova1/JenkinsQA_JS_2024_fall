/// <reference types="cypress" />

class NewJobPage {

    getJobNameField = () => cy.get('.jenkins-input')
    getFreeStlPrjType = () => cy.get('.label').contains('Freestyle project')
    getOKButton = () => cy.get('#ok-button')
    getItemNameInvalidErrorMessage = () => cy.get("#itemname-invalid")
    getUnsaveItemInvalidName = () => cy.get("#itemname-invalid").contains(/is an unsafe character/)
    getEmptyItemInvalidName = () => cy.get("#itemname-required")
    getFolferType = () => cy.get('.label').contains('Folder')
    getPrjNameFieldfromFolderPage = () => cy.get('input[id="name"]')
    getPipeLinePrjType = () => cy.get('.org_jenkinsci_plugins_workflow_job_WorkflowJob > :nth-child(2) > .desc')

    addNewProjectName(prjName) {
        this.getJobNameField().type(prjName)
        return this
    }
    
    selectFreestyleProject() {
        this.getFreeStlPrjType().click()
        return this
    }

    selectFolder() {
        this.getFolferType().click()
        return this
    }

    clickOKButton() {
        this.getOKButton().click()
    }

    addUnsaveNameItem() {
        this.getJobNameField().type("<")
        return this
    }

    addEmptyNameItem() {
        this.getJobNameField().clear()
        return this;
    }

    addFolderName(folderName) {
        this.getFreeStlPrjType().type(folderName)
        return this
    }

    addNewPrgNameFromFolder(projName) {
        this.getPrjNameFieldfromFolderPage().type(projName)
        return this
    }

    selectPipelineProject() {
        this.getPipeLinePrjType().click()
        return this
    }

};

export default NewJobPage;