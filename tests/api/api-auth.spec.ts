import { expect, test } from '@playwright/test'
import { BACKEND_URL, PASSWORD, USERNAME } from '../../config/env-data'

const loginPath = 'login/student'
const orderPath = 'orders'

test('auth with correct data should receive token', async ({ request }) => {
  const requestBody = {
    username: USERNAME,
    password: PASSWORD,
  }

  const authResponse = await request.post(`${BACKEND_URL}${loginPath}`, {
    data: requestBody,
  })

  const jwt = await authResponse.text()
  expect.soft(authResponse.status()).toBe(200)
  expect.soft(jwt).toBeDefined()
})

test('auth with incorrect data should not receive token', async ({ request }) => {
  const requestBody = {
    username: 'wrong name',
    password: 'wrong pass',
  }

  const authResponse = await request.post(`${BACKEND_URL}${loginPath}`, {
    data: requestBody,
  })

  expect.soft(authResponse.status()).toBe(401)
})

test('auth and create order', async ({ request }) => {
  const requestBody = {
    username: USERNAME,
    password: PASSWORD,
  }

  const authResponse = await request.post(`${BACKEND_URL}${loginPath}`, {
    data: requestBody,
  })

  const jwt: string = await authResponse.text()

  const orderPayload: any = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'alex',
    customerPhone: 'alexphone',
    comment: 'test',
  }

  const orderResponse = await request.post(`${BACKEND_URL}${orderPath}`, {
    data: orderPayload,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  const order: string = await orderResponse.json()
})
