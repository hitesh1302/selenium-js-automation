require('dotenv').config();
const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.manage().window().maximize();
    await this.driver.get(process.env.BASE_URL + 'users/login');
  }

  async selectCountryCode(){
    const countryCodeDropDown = await this.driver.findElement(By.className('iti__selected-flag'));
    await countryCodeDropDown.click();

    await this.driver.wait(until.elementLocated(By.id('country-listbox')), 5000);

    const countryCode = await this.driver.findElement(By.css('.iti__country[data-dial-code="91"]'));
    await countryCode.click();
  }
  async enterMobileNumber(mobileNumber){
    const mobileNumberInput = await this.driver.findElement(By.id('phone-code'));
    await mobileNumberInput.clear();
    await mobileNumberInput.sendKeys(mobileNumber);
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

  async getErrorMessage() {
    const locateElement = By.css('span[data-notify="message"]');

  // Wait until the element contains non-empty text
  await this.driver.wait(until.elementTextMatches(
    this.driver.findElement(locateElement),
    /.+/   // regex: one or more characters
  ), 5000, "Error message did not appear");

  const errorElement = await this.driver.findElement(locateElement);
  return (await errorElement.getText()).trim();
  }

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
