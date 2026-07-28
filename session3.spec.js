import { test, expect } from "@playwright/test";

test("Session 3: Functions and Logic", async ({ page }) => {
  // Basic JavaScript Functions
  function greetTester(TesterName = "Tester") {
    console.log("Hello " + TesterName);
  }

  // Call the function with a specific name
  greetTester("Rebecca");

  // Return values
  function isPageLoaded(status) {
    return status === "loaded";
  }

  const result = isPageLoaded("not loaded");

  console.log(result);
  console.log(isPageLoaded("loaded"));

  // Comparison operators: ===, !==, >, <, >=, <=
  console.log(5 === 5);
  console.log(5 === "5");
  console.log(5 !== 3);
  console.log(5 > 3);

  // Conditionals: if, else if, else
  function checkAccess(role) {
    if (role === "admin") {
      console.log("Full access granted");
    } else if (role === "user") {
      console.log("Limited access granted");
    } else {
      console.log("No access granted");
    }
  }

  checkAccess("Ramson");

  console.log(false || false);

  // AND / OR operators
  const isLoggedIn = true;
  const hasPermission = false;

  console.log(isLoggedIn && hasPermission); // AND operator
  console.log(isLoggedIn || hasPermission); // OR operator

  // Exercise 1
  /*
  Question: Write a function called hasAdminAccess that takes a role as an argument and returns true if the role is "admin" and false otherwise. Test the function with different roles and log the results to the console.
  */
  function hasAdminAccess(role) {
    if (role === "admin") {
      return true;
    } else {
      return false;
    }
  }

  console.log(hasAdminAccess("admin"));
  console.log(hasAdminAccess("user"));

  // Exercise 2
  /*
  Question: Update the hasAdminAccess function to also return true if the role is "superadmin" without addind a new if block. Test the function with different roles and log the results to the console.
  */
  function hasAdminAccess(role) {
    if (role === "admin" || "superadmin") {
      return true;
    } else {
      return false;
    }
  }
});
