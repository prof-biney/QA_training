import { test, expect } from "@playwright/test";

test("Session 4: Loops and Arrays", async ({ page }) => {
  // Arrays
  const testScenarios = ["Login Test", "Signup Test", "Logout Test"];

  console.log(testScenarios);
  console.log(testScenarios[2]);

  // Objects
  const user = {
    name: "Andrew",
    role: "admin",
    email: "abiney1321@gmail.com",
  };

  // console.log(user);
  console.log(user.role);

  /*
  Exercise 1:
  Create an object called testCase with three properties: title (string), priority (number),
  and automated (boolean). Log just the title to the console.
  */

  const testCase = {
    title: "Signin Test",
    priority: 2,
    automated: false,
  };

  console.log(testCase.title);

  // Loops: for and forEach
  const testScenarios = ["Login Test", "Signup Test", "Logout Test"];

  for (let i = 0; i < 3; i++) {
    console.log(`Run no. ${i + 1}: `, testScenarios[i]);
  }

  /* 
  Exercise 2: 
  Create an array called testCases, containing 3 objects. Each object should represent 
  a test scenario with a title (string), priority (number ) and automated (boolean). 
  Then use a for to loop through the array and log each test case title along with whether it's automated.
  */

  const testCases = [
    { title: "Login Test", priority: 1, automated: true },
    { title: "Signup Test", priority: 2, automated: false },
    { title: "Logout Test", priority: 3, automated: true },
  ];

  for (let i = 0; i < testCases.length; i++) {
    console.log(
      `Test Case: ${testCases[i].title}, Automated: ${testCases[i].automated}`,
    );
  }
});
