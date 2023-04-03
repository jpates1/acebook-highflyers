// Describing a test suite with the title "Signing up"
describe("Signing up", () => {

  // Test case for signing up with valid credentials and checking that the user is redirected to "/login"
  it("with valid credentials, redirects to '/login'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com"); // Entering a valid email address
    cy.get("#password").type("password"); // Entering a valid password
    cy.get("#submit").click(); // Submitting the signup form

    // Asserting that the URL contains "/login"
    cy.url().should("include", "/login");
  });

  // Test case for signing up with a missing password and checking that the user is redirected to "/signup"
  it("with missing password, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com"); // Entering a valid email address
    cy.get("#submit").click(); // Submitting the signup form without entering a password

    // Asserting that the URL contains "/signup"
    cy.url().should("include", "/signup");
  });

  // Test case for signing up with a missing email and checking that the user is redirected to "/signup"
  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#password").type("password"); // Entering a valid password
    cy.get("#submit").click(); // Submitting the signup form without entering an email

    // Asserting that the URL contains "/signup"
    cy.url().should("include", "/signup");
  });
});
