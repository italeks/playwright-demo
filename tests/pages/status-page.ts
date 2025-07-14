import { Locator, Page } from '@playwright/test'

export class StatusPage {
  readonly page: Page
  readonly orderItemFirst: Locator

  constructor(page: Page) {
    this.page = page
    this.orderItemFirst = page.getByTestId('order-item-0')
  }
}
