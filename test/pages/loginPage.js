require('dotenv').config();
const { By } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get(process.env.BASE_URL);
  }

  async changeToEmail(){
    const emailTab = await this.driver.findElement(By.css('button[type="button"]'));
    await emailTab.click();
  }

  async enterUsername(username) {
    const usernameInput = await this.driver.findElement(By.id('email'));
    await usernameInput.clear();
    await usernameInput.sendKeys(username);
  }

  async enterPassword(password) {
    const passwordInput = await this.driver.findElement(By.id('password'));
    await passwordInput.clear();
    await passwordInput.sendKeys(password);
  }

  async clickLogin() {
    const loginBtn = await this.driver.findElement(By.css('button[type="submit"]'));
    await loginBtn.click();
  }

  /*async getErrorMessage() {
    const errorElement = await this.driver.findElement(By.css('.error-message'));
    return await errorElement.getText();
  }*/

  async isLoggedIn() {
  try {
    await this.driver.findElement(By.css('.dashboard'));
    return true;
  } catch (err) {
    return false;
  }
}
}

module.exports = LoginPage;
