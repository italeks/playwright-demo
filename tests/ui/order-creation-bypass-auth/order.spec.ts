import { expect, Page, test } from '@playwright/test'
import { BACKEND_URL, PASSWORD, USERNAME } from '../../../config/env-data'
import { OrderPage } from '../../pages/order-page'
import { StatusPage } from '../../pages/status-page'

const loginPath = 'login/student'
let jwt: string = ''

test.beforeAll(async ({ request }) => {
  console.log('Init: getting jwt from backend')
  const response = await request.post(`${BACKEND_URL}${loginPath}`, {
    data: {
      username: USERNAME,
      password: PASSWORD,
    },
  })
  jwt = await response.text()
})

test.beforeEach(async ({ context }) => {
  // Set the local storage value for 'jwt'
  await context.addInitScript((token) => {
    localStorage.setItem('jwt', token)
  }, jwt)
})

test('create order and check success message', async ({ context }) => {
  const page = await context.newPage()

  const orderPage = new OrderPage(page)
  await orderPage.open()
  console.log(orderPage.url)
  await orderPage.createOrder()
  await expect(page.getByTestId('orderSuccessfullyCreated-popup-ok-button')).toBeVisible()
})

test('search for existing order', async ({ context }) => {
  const page: Page = await context.newPage()

  const statusPage = new StatusPage(page, '10306')
  await statusPage.open()
  await expect(statusPage.orderItemFirst).toBeVisible()
})
