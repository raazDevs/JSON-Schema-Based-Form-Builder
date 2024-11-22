import { test, expect } from '@playwright/test';

// Verify that this file exists and contains our Playwright tests
// If it doesn't exist, we'll need to create it

test.describe('JSON Schema Form Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('JSON validation', async ({ page }) => {
    const editor = page.locator('.monaco-editor');
    await editor.click();

    // Test valid JSON
    await page.keyboard.type(JSON.stringify({
      formTitle: "Test Form",
      formDescription: "This is a test form",
      fields: [
        {
          id: "name",
          type: "text",
          label: "Name",
          required: true
        }
      ]
    }));

    await expect(page.locator('text=Test Form')).toBeVisible();

    // Test invalid JSON
    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type('{invalid json}');

    await expect(page.locator('text=Invalid JSON')).toBeVisible();
  });

  test('Real-time form generation', async ({ page }) => {
    const editor = page.locator('.monaco-editor');
    await editor.click();

    const json = JSON.stringify({
      formTitle: "Dynamic Form",
      formDescription: "This form updates in real-time",
      fields: [
        {
          id: "email",
          type: "email",
          label: "Email",
          required: true
        }
      ]
    });

    for (let i = 0; i < json.length; i++) {
      await page.keyboard.type(json[i]);
      await page.waitForTimeout(50); // Small delay to simulate typing
    }

    await expect(page.locator('text=Dynamic Form')).toBeVisible();
    await expect(page.locator('text=This form updates in real-time')).toBeVisible();
    await expect(page.locator('label:has-text("Email")')).toBeVisible();
  });

  test('Form validation and submission', async ({ page }) => {
    const editor = page.locator('.monaco-editor');
    await editor.click();

    await page.keyboard.type(JSON.stringify({
      formTitle: "Validation Form",
      formDescription: "Test form validation",
      fields: [
        {
          id: "email",
          type: "email",
          label: "Email",
          required: true
        }
      ]
    }));

    // Try submitting without filling the required field
    await page.click('button:has-text("Submit")');
    await expect(page.locator('text=Email is required')).toBeVisible();

    // Fill in invalid email
    await page.fill('input[type="email"]', 'invalid-email');
    await page.click('button:has-text("Submit")');
    await expect(page.locator('text=Invalid email address')).toBeVisible();

    // Fill in valid email and submit
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("Submit")');
    await expect(page.locator('text=Form submitted successfully!')).toBeVisible();
  });

  test('Responsive layout', async ({ page }) => {
    // Test desktop layout
    await expect(page.locator('.md\\:flex-row')).toBeVisible();

    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.flex-col')).toBeVisible();
  });

  test('Error scenarios', async ({ page }) => {
    const editor = page.locator('.monaco-editor');
    await editor.click();

    // Test with empty JSON
    await page.keyboard.type('{}');
    await expect(page.locator('text=Enter your JSON schema')).toBeVisible();

    // Test with missing required fields
    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(JSON.stringify({
      formTitle: "Error Form",
      formDescription: "This form is missing required fields",
      fields: [
        {
          id: "name",
          type: "text",
          label: "Name"
          // missing 'required' field
        }
      ]
    }));

    await page.click('button:has-text("Submit")');
    // Expect no validation error, as the field is not marked as required
    await expect(page.locator('text=Form submitted successfully!')).toBeVisible();
  });
});

