import { expect, test } from '@playwright/test'
import { LoginPage } from '../../pages/login-page'
import { OrderPage } from '../../pages/order-page'

test.only('Sign in button is disabled when an invalid username is entered', async ({ page }) => {
  const authPage = new LoginPage(page)
  await authPage.open()
  const OrderPage: OrderPage = await authPage.signIn()
  await expect(OrderPage.statusButton).toBeVisible()

  await OrderPage.createOrder()
  await expect(OrderPage.okButton).toBeVisible()
})
