import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("Verify successful login with valid credentials", async ({ page }) => {
    // Navigate to login page
    await page.goto("https://toss.aoinnovations.org");
    await page.waitForLoadState("networkidle", { timeout: 60000 });

    // Enter valid username and password
    await page.getByRole("textbox", { name: "Username" }).fill("Harold");
    await page.getByRole("textbox", { name: "Password" }).fill("Hod2000");

    // Click "Login" button
    await page.getByRole("button", { name: "Login" }).click();

    // Redirected to dashboard/home screen
    await expect(
      page.getByRole("dialog", { name: "Select your dashboard" }),
    ).toBeVisible({ timeout: 30000 });
  });

  test("Verify SQL Injection attack prevention", async ({ page }) => {
    // Navigate to login page
    await page.goto("https://toss.aoinnovations.org");
    await page.waitForLoadState("networkidle", { timeout: 60000 });

    // Enter SQL injection payload in username and any password
    await page.getByRole("textbox", { name: "Username" }).fill("' OR 1=1--");
    await page.getByRole("textbox", { name: "Password" }).fill("anything");

    // Click "Login" button
    await page.getByRole("button", { name: "Login" }).click();

    // Verify
    await expect(page.getByRole("listitem")).toHaveText(
      "Failed to login. Check your credentials.",
    );
  });

  // Create a test for Cross-Site Scripting (XSS) attack prevention (LOG__005 in the document)

  // Create any other single test you want from the document, and make sure to include a comment above it describing what the test is doing.
});
