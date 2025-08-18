require('dotenv').config();
const { By, until } = require('selenium-webdriver');

class RegistrationPage {
    constructor(driver) {
        this.driver = driver;
    }
    async open() {
        await this.driver.get(process.env.BASE_URL + 'users/registration');
    }
    async enterFullName(fullName){
        const fullNameInput = await this.driver.findElement(By.css('input[name="name"]'));
        await fullNameInput.clear();
        await fullNameInput.sendKeys(fullName);
    }
    async selectCountryCode(){
        const countryCodeDropDown = await this.driver.findElement(By.className('iti__selected-flag'));
        await countryCodeDropDown.click();

        await this.driver.wait(until.elementsLocated(By.id('country-listbox')), 5000);

        const countryCode =await this.driver.findElement(By.css('.iti__country[data-dial-code="91"]'));
        await countryCode.click();
    }
    async enterMobileNumber(mobileNumber){
        const mobileNumberInput = await this.driver.findElement(By.id('phone-code'));
        await mobileNumberInput.clear();
        await mobileNumberInput.sendKeys(mobileNumber);
    }
    async enterEmail(email){
        const emailInput = await this.driver.findElement(By.css('Input[name="email"]'));
        await emailInput.clear();
        await emailInput.sendKeys(email);
    }
    async enterPassword(password){
        const passwordInput = await this.driver.findElement(By.css('input[name="password"]'));
        await passwordInput.clear();
        await passwordInput.sendKeys(password);
    }
    async enterConfirmPassword(confirmPassword){
        const confirmPasswordInput = await this.driver.findElement(By.css('input[name="password_confirmation"]'));
        await confirmPasswordInput.clear();
        await confirmPasswordInput.sendKeys(confirmPassword);
    }
    async acceptTermsAndConditions() {
        const checkBox = await this.driver.findElement(By.xpath('//span[@class="aiz-square-check"]'));
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", checkBox);

    try {
        await checkBox.click();
    } catch (err) {
        // fallback to JS click if intercepted
        await this.driver.executeScript("arguments[0].click();", checkBox);
    }
}
    async clickRegister() {
        const registrationButton = await this.driver.findElement(By.css('button[type="submit"]'));
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", registrationButton);
        try {
        await registrationButton.click();
    } catch (err) {
        // fallback to JS click if intercepted
        await this.driver.executeScript("arguments[0].click();", registrationButton);
    }
    }
    async getValidationMessage(){
        const locateElement = By.css('span[data-notify="message"]');
        this.driver.wait(until.elementTextMatches(this.driver.findElement(locateElement)), 5000, "Validation message did not appear");

        const validationMessageElement = await this.driver.findElement(locateElement);
        return (await validationMessageElement.getText()).trim();
    }
}
module.exports = RegistrationPage;