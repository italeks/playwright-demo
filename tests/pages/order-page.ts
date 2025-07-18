import { Locator, Page } from '@playwright/test'
import { SERVICE_URL } from '../../config/env-data'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly clientName: Locator
  readonly clientPhone: Locator
  readonly createOrderButton: Locator
  readonly okButton: Locator
  readonly url: string = SERVICE_URL

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.clientName = page.getByTestId('username-input')
    this.clientPhone = page.getByTestId('phone-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.okButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
  }

  async createOrder(): Promise<void> {
    await this.clientName.fill('random-client-name')
    await this.clientPhone.fill('random-client-phone')
    await this.createOrderButton.click()
  }

  async open() {
    await this.page.goto(this.url)
  }
}
