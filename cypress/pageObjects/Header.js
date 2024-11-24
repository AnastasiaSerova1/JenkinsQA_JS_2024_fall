/// <reference types="cypress" />

import JobPage from "./JobPage";

class Header {

    getSearchField = () => cy.get("#search-box");
    getSearchOption = () => cy.get("#search-box-completion li");

    typeSearchTerm(term) {
        this.getSearchField().type(term);
        return this;
    };

    clickSearchOption() {
        this.getSearchOption().first().click();
        return this;
    };

    searchTerm() {
        this.getSearchField().type('{enter}');
        return new JobPage();
    };

    search(input) {
        this.getSearchField().type(`${input}{enter}`);
        return new JobPage();
    };

};

export default Header;