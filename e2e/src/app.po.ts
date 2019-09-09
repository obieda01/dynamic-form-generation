import { browser, by, element, Key } from "protractor";

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.tagName("mat-card-title")).getText();
  }
  getSubCardTitleText() {
    return element(by.css(" mat-card-content mat-card-title")).getText();
  }
  getSubCardSubTitleText() {
    return element(by.css(" mat-card-content mat-card-subtitle")).getText();
  }

  fillNullInput() {
    element(by.css('[type="submit"]')).click();
  }
  clickCancle() {
    element(by.css('[type="button"]')).click();
  }
  getErrorMessage() {
    return element(by.css('mat-error')).getText();
  }
  onSubmit() {
    return element(by.css('button[color="primary"]')).click();
  }
  onCancel() {
    return element.all(by.css('button[color="primary"]'));
  }
}
