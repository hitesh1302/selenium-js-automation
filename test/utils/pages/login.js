require('dotenc').config();
const { By } = require('selenium-webdriver');

class LoginPage {
    constructor (driver){
        this.driver = driver;
    }
    async open(){
        await this.driver.get(process.env.BASE_URL);
    }
    async enterUsername(){
        const usernameInput = await this.driver.findElement(By.id('email'));
        await usernameInput.clear();
        await usernameInput.sendKeys(process.env.VALID_USERNAME);
    }
    async enterPassword(){
        const passwordInput = await this.driver.findElement(By.id('password'));
        await passwordInput.clear();
        await passwordInput.sendKeys(process.env.VALID_USERNAME);
    }
    async clickButton(){
        const submitButton = await this.driver.findElement(By.css('button[type="submit"}'));
        await submitButton.click();
    }

}