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
    const countryCodeDropDown = await this.driver.wait(until.elementLocated(By.className('iti__selected-flag')), 10000);
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
      let loginModal =null;
      try{
        loginModal = await this.driver.wait(until.elementLocated(By.xpath("//div[contains(@class,'modal-content')]")),2000);
      }
      catch (error){
         console.log('No login modal detected in try catch');
      }
         if (loginModal){
          console.log('Login modal detected');
          await this.driver.sleep(1000);
          const emailTab = await this.driver.wait(until.elementLocated(By.css("button.btn.btn-link.text-primary")),5000);
          await this.driver.wait(until.elementIsVisible(emailTab), 5000);
          await this.driver.sleep(1000);
          await emailTab.click();
      }
      else{
          console.log('No login modal detected for email field');
          await this.driver.sleep(1000);
          const emailTab = await this.driver.wait(until.elementLocated(By.css('button[type="button"]')), 20000);
          const actions = this.driver.actions({async:true});
          await actions.move({origin:emailTab}).perform();
          await this.driver.sleep(1000);
          await emailTab.click();
      }
    }

  async enterUsername(username) {
    const usernameInput = await this.driver.findElement(By.id('email'));
    await usernameInput.clear();
    await usernameInput.sendKeys(username);
  }

  async enterPassword(password) {
    let loginModal =null;
      try{
        loginModal = await this.driver.wait(until.elementLocated(By.xpath("//div[contains(@class,'modal-content')]")),2000);
      }
      catch (error){
         console.log('No login modal detected in try catch');
      }
    if (loginModal){
        console.log('Login modal detected for password field');
        await this.driver.sleep(1000);
        const passwordInput = await this.driver.wait(until.elementLocated(By.css('input[type="password"]')),5000);
        await passwordInput.sendKeys(password);
    }
    else{
        console.log('No login modal detected');
        await this.driver.sleep(1000);
        const passwordInput = await this.driver.findElement(By.id('password'));
         await passwordInput.clear();
         await passwordInput.sendKeys(password);
    }
  }

  async clickLogin() {
    let loginModal=null;
      try{
        loginModal = await this.driver.wait(until.elementLocated(By.xpath("//div[contains(@class,'modal-content')]")),2000);
      }
      catch (error){
         console.log('No login modal detected in try catch');
      }
    if (loginModal){
        console.log('Login modal detected for submit button');
        await this.driver.sleep(1000); 
        const loginBtn = await loginModal.findElement(By.xpath('//div[contains(@class,"mb-5")]//button[@type="submit"]'));
        const actions = this.driver.actions({async:true});
        await actions.move({origin:loginBtn}).perform();
        await this.driver.sleep(1000);
        await loginBtn.click();
    }
    else{
        console.log('No login modal detected for submit button');
        await this.driver.sleep(1000);
        const loginBtn = await this.driver.wait(until.elementLocated(By.css('button[type="submit"]')), 20000);
        const actions = this.driver.actions({async:true});
        await actions.move({origin:loginBtn}).perform();
        await this.driver.sleep(1000);
        await loginBtn.click();
    }
  }

  async getErrorMessage() {
    // Wait until the element is located
    const errorElement = await this.driver.wait(
        until.elementLocated(By.css('span[data-notify="message"]')),
        5000
    );
    // Wait until the element contains non-empty text
    await this.driver.wait(
        until.elementTextMatches(errorElement, /.+/),
        5000,
        'Error message did not appear'
    );
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
