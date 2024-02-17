// @ts-check
import { test, expect } from "@playwright/test";

const CAT_IMAGE_BASE_URL = "https://cataas.com/cat";
const LOCALHOST_URL = "http://localhost:5173";

test("app shows random fact and image", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByRole("paragraph");
  const image = await page.getByRole("img");

  const textContent = await text.textContent();
  const imageScr = await image.textContent();

  expect(textContent).not.toBeNull();
  expect(imageScr?.startsWith("hola")).toBeTruthy();
});
