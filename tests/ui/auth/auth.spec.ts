import { expect, test } from '@playwright/test'
import { SERVICE_URL } from '../../../config/env-data'

test('Sign in button is disabled when an invalid username is entered', async ({ page }) => {
  await page.goto(SERVICE_URL)
  const usernameField = page.getByTestId('username-input')
  await usernameField.fill('-')
  const signInButton = page.getByTestId('signIn-button')
  await expect(signInButton).toBeDisabled()

  // check if error msg is present
  const errorMessage = page.getByTestId('username-input-error').nth(0)
  await expect(errorMessage).toBeVisible()
})

// test('incorrect user/password', async ({ page }) => {
//   await page.goto(SERVICE_URL)
//   const usernameField = page.getByTestId('username-input')
//   await usernameField.fill('-')
//   const usernameField = page.getByTestId('username-input')
//   await usernameField.fill('-')
//   const signInButton = page.getByTestId('signIn-button')
//   await expect(signInButton).toBeDisabled()

//   // check if error msg is present
//   const errorMessage = page.getByTestId('username-input-error').nth(0);
//   await expect(errorMessage).toBeVisible();
// })
