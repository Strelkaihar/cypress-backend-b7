import { postRequestBody, putRequestBody } from "../../fixtures/testData.json";

describe("CRUD operations", () => {
  let userId;
  let updatedUserName;

  it("Create new student using post", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("baseUrl"),
      body: postRequestBody,
    }).then((response) => {
      userId = response.body.id;
      cy.log(JSON.stringify(response.body, null, 2));
      cy.validateResponse(response, postRequestBody);
      // expect(response.status).to.equal(200)
      // expect(response.duration).to.lessThan(200)
      // expect(response.body.firstName).to.equal(postRequestBody.firstName)

      // Object.entries(postRequestBody).forEach(([key,value]) => {
      //     expect(response.body[key]).to.equal(value)
      // })
    });
  });
  it("Read the created student using GET", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}/${userId}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      cy.log(JSON.stringify(response.body, null, 2));
    });
  });
  it("Update user which we already created using PUT", () => {
    cy.request({
      method: "PUT",
      url: `${Cypress.env("baseUrl")}/${userId}`,
      body: putRequestBody,
    }).then((response) => {
      updatedUserName = response.body.firstName;
      cy.validateResponse(response, putRequestBody);
      cy.log(JSON.stringify(response.body, null, 2));
    });
  });

  it("Read the created student using GET", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}/${userId}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.lessThan(2000);
      expect(response.body.firstName).to.equal(updatedUserName);
    });
  });
  it("delete the created student using DELETE", () => {
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("baseUrl")}/${userId}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
