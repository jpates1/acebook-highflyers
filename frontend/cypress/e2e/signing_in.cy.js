// Describing a test suite with the title "Signing in"
describe("Signing in", () => {

  // Before running the tests, sign up a user with a test email and password
  before(() => {
    cy.signup("user@email.com", "12345678")
  })

  // Test case for signing in with valid credentials and checking that the user is redirected to "/posts"
  it("with valid credentials, redirects to '/posts'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com"); // Entering the email of the previously signed up user
    cy.get("#password").type("password"); // Entering the password of the previously signed up user
    cy.get("#submit").click(); // Submitting the login form

    // Asserting that the URL contains "/posts"
    cy.url().should("include", "/posts");
  });

  // Test case for signing in with a missing password and checking that the user is redirected to "/login"
  it("with missing password, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com"); // Entering the email of the previously signed up user
    cy.get("#submit").click(); // Submitting the login form without entering a password

    // Asserting that the URL contains "/login"
    cy.url().should("include", "/login");
  });

  // Test case for signing in with a missing email and checking that the user is redirected to "/login"
  it("with missing email, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#password").type("password"); // Entering the password of the previously signed up user
    cy.get("#submit").click(); // Submitting the login form without entering an email

    // Asserting that the URL contains "/login"
    cy.url().should("include", "/login");
  });
});
