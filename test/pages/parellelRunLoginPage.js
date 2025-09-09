require('dotenv').config();
const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(drivers) {
    this.drivers = drivers;
  }

  async open() {
    for (let browser in this.drivers){
    await this.drivers[browser].manage().window().maximize();
    await this.drivers[browser].get(process.env.BASE_URL + 'users/login');
  }
  }

  async selectCountryCode(){
    for (let browser in this.drivers){
    const countryCodeDropDown = await this.drivers[browser].findElement(By.className('iti__selected-flag'));
    await countryCodeDropDown.click();

    await this.drivers[browser].wait(until.elementLocated(By.id('country-listbox')), 5000);

    const countryCode = await this.drivers[browser].findElement(By.css('.iti__country[data-dial-code="91"]'));
    await countryCode.click();
    }
  }
  async enterMobileNumber(mobileNumber){
    for (let browser in this.drivers){
    const mobileNumberInput = await this.drivers[browser].findElement(By.id('phone-code'));
    await mobileNumberInput.clear();
    await mobileNumberInput.sendKeys(mobileNumber);
    }
  }

  async changeToEmail(){
    for (let browser in this.drivers){
    const emailTab = await this.drivers[browser].findElement(By.css('button[type="button"]'));
    await emailTab.click();
    }
  }

  async enterUsername(username) {
    for (let browser in this.drivers){
    const usernameInput = await this.drivers[browser].findElement(By.id('email'));
    await usernameInput.clear();
    await usernameInput.sendKeys(username);
    }
  }

  async enterPassword(password) {
    for (let browser in this.drivers){
    const passwordInput = await this.drivers[browser].findElement(By.id('password'));
    await passwordInput.clear();
    await passwordInput.sendKeys(password);
    }
  }

  async clickLogin() {
    for (let browser in this.drivers){
    const loginBtn = await this.drivers[browser].findElement(By.css('button[type="submit"]'));
    await loginBtn.click();
    }
  }

  async getErrorMessage() {
    for (let browser in this.drivers){
    const locateElement = By.css('span[data-notify="message"]');

  // Wait until the element contains non-empty text
  await this.drivers[browser].wait(until.elementTextMatches(
    this.drivers[browser].findElement(locateElement),
    /.+/   // regex: one or more characters
  ), 5000, "Error message did not appear");

  const errorElement = await this.drivers[browser].findElement(locateElement);
  return (await errorElement.getText()).trim();
}
  }

  async isLoggedIn() {
    for (let browser in this.drivers){
  try {
    await this.drivers[browser].findElement(By.css('.dashboard'));
    return true;
  } catch (err) {
    return false;
  }
}
  }
}

module.exports = LoginPage;
