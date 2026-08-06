// ============================================================
// SESSION 7 — MAKING ASSERTIONS
// ============================================================
// An "assertion" is a CLAIM you make about the page. Playwright
// checks whether that claim is true.
//   - Claim is TRUE  -> test passes
//   - Claim is FALSE -> test fails, and Playwright tells you
//                       exactly what it expected vs what it found
//
// Remember: FINDING an element (getByRole, getByLabel, etc.)
// does NOT test anything by itself. Only an assertion (expect)
// actually checks something. A test with no assertions is just
// a script that clicks around — it can't catch bugs.
// ============================================================

import { test, expect } from "@playwright/test";

// ------------------------------------------------------------
// TEST 1: toBeVisible()
// ------------------------------------------------------------
// Use toBeVisible() to confirm an element is actually showing
// on the page — not hidden, not missing, not still loading.
test("Session 7: Playwright Fundamentals 2", async ({ page }) => {
  // Button
  // const button = page.getByRole("button", { name: "Sign In" });
  // ^ This line only FINDS the button. On its own it tests
  //   nothing — there's no claim being made yet. That's why
  //   it's commented out here; it's left as a reminder of the
  //   difference between finding and asserting.

  // Step 1: Navigate to the page we want to test
  await page.goto("https://synergyhr.aoinnovations.org/login");

  // Step 2: Wait for the page to fully finish loading (including
  // background network activity) before we try to interact with
  // anything. "networkidle" means "no network requests happening
  // for a short while" — i.e. the page has settled.
  // timeout: 60000 means we'll wait up to 60 seconds for this
  // before giving up and failing the test.
  await page.waitForLoadState("networkidle", { timeout: 60000 });

  // Assertions
  // Step 3: NOW we make a claim: "The Sign In button is visible."
  // getByRole('button', { name: 'Sign In' }) FINDS the button.
  // .toBeVisible() is the ASSERTION — the actual check.
  // { timeout: 30000 } means: keep checking for up to 30 seconds
  // before failing — useful if the button takes a moment to render.
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible({
    timeout: 30000,
  });

  // await expect([selector]).toBeVisible();
  // ^ This is a generic template/reminder line — [selector] is not
  //   real code, it's a placeholder showing the general pattern:
  //   expect(<locator>).<assertion>()
});

// ------------------------------------------------------------
// TEST 2: toHaveTitle()
// ------------------------------------------------------------
// Use toHaveTitle() to confirm the browser tab's title matches
// what you expect. This is a quick way to confirm you landed on
// the correct page after navigating.
test("Assertion: toHaveTitle", async ({ page }) => {
  await page.goto("https://aoholdings.net");

  // Claim: "This page's title is exactly 'Home - AOHOLDINGS'."
  // Note: this checks the EXACT string. If even one character is
  // different (spacing, capitalization, etc.), the test fails.
  await expect(page).toHaveTitle("Home - AOHOLDINGS");
});

// ------------------------------------------------------------
// TEST 3: toHaveText()
// ------------------------------------------------------------
// Use toHaveText() to confirm an element's visible text matches
// exactly what you expect. Great for checking headings, labels,
// or messages say precisely the right thing.
test("Assertion: toHaveText", async ({ page }) => {
  await page.goto("https://synergyhr.aoinnovations.org/login");
  await page.waitForLoadState("networkidle", { timeout: 60000 });

  // Step 1: Find the heading element first and store it in a
  // variable. We do this separately here (instead of writing it
  // all in one line) just to make the code easier to read —
  // both approaches work exactly the same way.
  const header = page.getByRole("heading", {
    name: "Sign in to your workspace",
  });

  // Step 2: Assert that heading's text is EXACTLY this string.
  // Careful: getByRole's { name: ... } is used to FIND the element
  // (it can sometimes match loosely), while toHaveText() is the
  // ASSERTION confirming the exact visible text.
  await expect(header).toHaveText("Sign in to your workspace");
});

// ------------------------------------------------------------
// TEST 4: toHaveURL()
// ------------------------------------------------------------
// Use toHaveURL() to confirm that navigation actually happened —
// i.e. that clicking something really took the user to the
// correct new page, not just that the click "worked".
test("Assertion: toHaveURL", async ({ page }) => {
  // This sets a timeout for the WHOLE test (all steps combined),
  // not just one action. Default is normally 30 seconds — we're
  // extending it to 60 seconds because this test does several
  // slow steps: load, wait, click, and navigate again.
  test.setTimeout(60000);

  await page.goto("https://aoholdings.net");
  await page.waitForLoadState("networkidle", { timeout: 60000 });

  // Find the "About Us" link.
  // exact: true means the visible text must match "About Us"
  // EXACTLY — it won't match something like "About Us Team" or
  // "All About Us". Useful when there could be similar-sounding
  // links on the same page.
  const aboutUsLink = page.getByRole("link", { name: "About Us", exact: true });

  // Claim 1: the link is visible before we try to click it.
  // Always good practice to assert visibility before interacting
  // with something — clicking on an invisible element is a common
  // source of confusing failures.
  await expect(aboutUsLink).toBeVisible();

  // Perform the action: click the link.
  // Note this is NOT an assertion — it's an ACTION. It doesn't
  // check anything, it just does something (like getByRole does
  // for finding). The real check comes next.
  await aboutUsLink.click();

  // Claim 2: after clicking, the browser's URL should now be the
  // About Us page. This is the proof that navigation actually
  // occurred — not just that the click "happened" but that it
  // led somewhere correct.
  await expect(page).toHaveURL("https://aoholdings.net/about-us/");
});

// ============================================================
// QUICK REFERENCE — ASSERTIONS COVERED TODAY
// ============================================================
// toBeVisible()  -> Is this element showing on the page?
// toHaveTitle()  -> Does the browser tab title match exactly?
// toHaveText()   -> Does this element's visible text match exactly?
// toHaveURL()    -> Did navigation lead to the correct URL?
//
// PATTERN TO REMEMBER:
//   1. FIND something   -> page.getByRole(), getByLabel(), etc.
//   2. CLAIM something  -> expect(<found thing>).<assertion>()
//   3. Only step 2 is what makes it a real TEST, not just a script.
// ============================================================
