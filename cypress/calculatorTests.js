<reference types="cypress" />;
import React from "react";

describe("calculator app", function () {
  beforeEach(function () {
    //Nvigates to the test site before each test case
    cy.visit("http://127.0.0.1:5500/public/index.html");
    cy.url().should("eq", "http://127.0.0.1:5500/public/index.html");

    //Pulls back each element before each test and assigns them an allias
    cy.get(".data-ac").as("allClearBtn");
    cy.get(".data-delete").as("deleteBtn");
    cy.get(".data-equals").as("equalsBtn");
    cy.get(".data-operation").as("operationBtns");
    cy.get(".data-number").as("numberBtns");
    cy.get("#previous-operand").as("previousOperand");
    cy.get("#current-operand").as("currentOperand");
  });

  it("Elements contain the correct contents", () => {
    //Checks that the text within the elements is correct
    cy.get("@allClearBtn").should("contain", "AC");
    cy.get("@deleteBtn").should("contain", "DEL");
    cy.get("@equalsBtn").should("contain", "=");
    cy.get("@previousOperand").should("contain", "");
    cy.get("@currentOperand").should("contain", "");

    //Loops through the operation buttns to check their all correct
    cy.get("@operationBtns").each((operationBtn) => {
      cy.wrap(operationBtn)
        .invoke("text")
        .then((text) => {
          expect(["÷", "*", "+", "-"]).to.include(text.trim());
        });
    });

    //Loops through the number buttns to check their all correct
    cy.get("@numberBtns").each((numberBtns) => {
      cy.wrap(numberBtns)
        .invoke("text")
        .then((text) => {
          expect([
            "7",
            "8",
            "9",
            "4",
            "5",
            "6",
            "1",
            "2",
            "3",
            ".",
            "0",
          ]).to.include(text.trim());
        });
    });
  });

  it("Sequential user flow test", () => {
    // Define test steps for the user flow
    const testSteps = [
      { numberIndex: 0, expectedPrevious: "", expectedCurrent: "7" },
      { numberIndex: 1, expectedPrevious: "", expectedCurrent: "78" },
      { operationIndex: 2, expectedPrevious: "78 +", expectedCurrent: "" },
      { numberIndex: 2, expectedPrevious: "78 +", expectedCurrent: "9" },
      { utilityBtn: "equalsBtn", expectedPrevious: "", expectedCurrent: "87" },
      { operationIndex: 3, expectedPrevious: "87 -", expectedCurrent: "" },
      { numberIndex: 4, expectedPrevious: "87 -", expectedCurrent: "5" },
      { utilityBtn: "equalsBtn", expectedPrevious: "", expectedCurrent: "82" },
      { operationIndex: 1, expectedPrevious: "82 *", expectedCurrent: "" },
      { numberIndex: 3, expectedPrevious: "82 *", expectedCurrent: "4" },
      { utilityBtn: "equalsBtn", expectedPrevious: "", expectedCurrent: "328" },
      { operationIndex: 0, expectedPrevious: "328 ÷", expectedCurrent: "" },
      { numberIndex: 7, expectedPrevious: "328 ÷", expectedCurrent: "2" },
      { utilityBtn: "equalsBtn", expectedPrevious: "", expectedCurrent: "164" },
      { utilityBtn: "allClearBtn", expectedPrevious: "", expectedCurrent: "" },
      { numberIndex: 8, expectedPrevious: "", expectedCurrent: "3" },
      { operationIndex: 2, expectedPrevious: "3 +", expectedCurrent: "" },
      { numberIndex: 1, expectedPrevious: "", expectedCurrent: "8" },
      { utilityBtn: "equalsBtn", expectedPrevious: "", expectedCurrent: "11" },
      { utilityBtn: "deleteBtn", expectedPrevious: "", expectedCurrent: "1" },
      { utilityBtn: "deleteBtn", expectedPrevious: "", expectedCurrent: "" },
      { utilityBtn: "deleteBtn", expectedPrevious: "", expectedCurrent: "" },
      { numberIndex: 6, expectedPrevious: "", expectedCurrent: "1" },
      { operationIndex: 0, expectedPrevious: "1 ÷", expectedCurrent: "" },
      { numberIndex: 10, expectedPrevious: "1 ÷", expectedCurrent: "0" },
      {
        utilityBtn: "equalsBtn",
        expectedPrevious: "",
        expectedCurrent: "Infinity",
      },
    ];

    // Loop through the test steps and execute them
    testSteps.forEach((step) => {
      const {
        numberIndex,
        operationIndex,
        utilityBtn,
        expectedPrevious,
        expectedCurrent,
      } = step;

      if (numberIndex != undefined) {
        // If number index is defined, click the number button at that index
        cy.get("@numberBtns").eq(numberIndex).click();
      } else if (operationIndex != undefined) {
        // If operation index is defined, click the operation button at that index
        cy.get("@operationBtns").eq(operationIndex).click();
      } else if (utilityBtn != undefined) {
        // If utility button class is defined, click the button with that class
        cy.get(`@${utilityBtn}`).click();
      }

      // Assert the expected values for previous and current operands
      cy.get("@previousOperand").should("contain", expectedPrevious);
      cy.get("@currentOperand").should("contain", expectedCurrent);
    });
  });
});
