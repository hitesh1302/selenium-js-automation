require('dotenv').config();
const { By, until } = require('selenium-webdriver');
const { Actions } = require('selenium-webdriver/lib/input');

class AddProductToCartPage {
    constructor(driver) {
        this.driver = driver;
    }

    async open() {
        await this.driver.get(process.env.BASE_URL);
    }
    async clickOnAddToCartButton() {
    const product = await this.driver.wait(
        until.elementLocated(By.xpath("//h4[contains(normalize-space(), 'Túi Vải Bố Chống Nước')]")),
        50000 );

    await this.driver.executeScript("arguments[0].scrollIntoView(true);", product);

    // Hover over the product card
    const actions = this.driver.actions({ async: true });
    await actions.move({ origin: product }).perform();

    const addToCartButton = await this.driver.wait(until.elementLocated(By.className('cart-btn')),
    20000 );
    const actionOnCardButton = this.driver.actions({ async: true });
    await actionOnCardButton.move({ origin: addToCartButton }).perform();
    await this.driver.wait(until.elementIsVisible(addToCartButton), 5000);
    await this.driver.wait(until.elementIsEnabled(addToCartButton), 5000);
    await addToCartButton.click();
  }
  async clickAlertAddCartBtn(){
    const alertCartBtn = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'add-to-cart')]")),
        10000);
    await alertCartBtn.click();
  }

}
module.exports = AddProductToCartPage;