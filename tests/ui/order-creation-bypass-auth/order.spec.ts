import { expect, test } from '@playwright/test'
import { BACKEND_URL, PASSWORD, SERVICE_URL, USERNAME } from '../../../config/env-data'
import { faker } from '@faker-js/faker/locale/ar'

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
  await page.goto(SERVICE_URL)
  await page.getByTestId('username-input').fill(faker.internet.username())
  await page.getByTestId('phone-input').fill(faker.phone.number())
  await page.getByTestId('createOrder-button').click()
  await expect(page.getByTestId('orderSuccessfullyCreated-popup-ok-button')).toBeVisible()
})