import {test, expect} from "@playwright/test";

test("JS Test", async({ page }) => {
  const name = "Andrew";
  console.log("Hello", name);
})
