/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";
import genData from "../fixtures/genData"

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import Header from '../pageObjects/Header';
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";
import FolderPage from "../pageObjects/FolderPage";

import newJobPageData from "../fixtures/newJobPageData.json";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const header = new Header();
const freestyleProjectPage = new FreestyleProjectPage();
const folderPage = new FolderPage();

describe('US_01.006 | FreestyleProject > Move project', () => {
    let project = genData.newProject();

    it('TC_01.006.06 | Choose from a list of existing folders', () => {
        context('should create 5 folders and verify they exist', () => {
            dashboardPage.clickNewItemMenuLink();
            newJobPage.typeNewItemName(newJobPageData.projectName)
                .selectFreestyleProject()
                .clickOKButton();
            freestyleProjectPage.clickSaveButton();
            header.clickJenkinsLogo();

            for (let i = 1; i <= 5; i++) {
                const uniqueFolderName = `${newJobPageData.folderName} ${i}`;
                dashboardPage.clickNewItemMenuLink();
                newJobPage.typeNewItemName(uniqueFolderName)
                    .selectFolder()
                    .clickOKButton();
                header.clickJenkinsLogo()
                cy.contains(uniqueFolderName).should('exist');
            }
        })

        const randomFolderNumber = faker.number.int({ min: 1, max: 5 });
        const selectedFolder = `${newJobPageData.folderName} ` + randomFolderNumber
        dashboardPage.openProjectPage(newJobPageData.projectName)
        freestyleProjectPage.clickMoveMenuItem()
            .selectNewProjectDestination(`/${selectedFolder}`)
            .clickMoveButton();

        freestyleProjectPage.getProjectInfoSection().should('contain', `Full project name: ${selectedFolder}/${newJobPageData.projectName}`)
    });

    it('TC_01.006.01 | Move project from the Project Page', () => {
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.name)
            .selectFolder()
            .clickOKButton();
        folderPage.clickSaveBtn()
            .clickDashboardBreadcrumbsLink();
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.newName)
            .selectFreestyleProject()
            .clickOKButton();
        freestyleProjectPage.clickSaveButton();
        cy.url().should('include', `/${project.newName}`)
        freestyleProjectPage.clickMoveMenuItem()
            .selectNewProjectDestination(`/${project.name}`)
            .clickMoveButton();

        cy.url().should('include', `/job/${project.name}/job/${project.newName}`);
    });
});