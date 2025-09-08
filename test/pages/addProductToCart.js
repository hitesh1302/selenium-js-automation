require('dotenv').config();
const { By, until } = require('selenium-webdriver');
const { Actions } = require('selenium-webdriver/lib/input');

class AddProductToCartPage {
    constructor(driver) {
        this.driver = driver;
    }

    async open() {
            await this.driver.executeScript(`window.location.href = '${process.env.BASE_URL}'`);

    // Wait for the URL to update
    await this.driver.wait(async () => {
        const url = await this.driver.getCurrentUrl();
        return url === process.env.BASE_URL || url === process.env.BASE_URL + '/';
    }, 10000);
    }
    async clickOnAddToCartButton() {

       const addToCartButton = await this.driver.wait(
       until.elementLocated(By.xpath("//h4[normalize-space()='Đồng hồ EYKI 41 mm Nam']/ancestor::div[contains(@class,'prod-box')]//a[contains(@class,'cart-btn')]")),
      10000
     );

// Scroll to the button itself
     await this.driver.executeScript("arguments[0].scrollIntoView(true);", addToCartButton);

// Hover over card (so button shows up)
    const product = await this.driver.findElement(By.xpath("//h4[normalize-space()='Đồng hồ EYKI 41 mm Nam']/ancestor::div[contains(@class,'prod-box')]"));
    const actions = this.driver.actions({ async: true });
    await actions.move({ origin: product }).perform();

// Wait for visibility and click
    await this.driver.wait(until.elementIsVisible(addToCartButton), 5000);
    await addToCartButton.click();

  }
  async clickAlertAddCartBtn(){
    const alertCartBtn = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'add-to-cart')]")),
        10000);
    await alertCartBtn.click();
  }
  async clickAlertBuyNowBtn(){
    const buyNowButton = await this.driver.wait(
        until.elementLocated(By.xpath("//button[contains(@class,'buy-now') and contains(.,'Mua ngay')]")),
        10000
    );

    // Scroll into view (important for modals)
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", buyNowButton);

    // Wait until visible + enabled
    await this.driver.wait(until.elementIsVisible(buyNowButton), 5000);
    await this.driver.wait(until.elementIsEnabled(buyNowButton), 5000);

    // Small delay for modal animation or toast to disappear
    await this.driver.sleep(500);

    try {
        await buyNowButton.click();
    } catch (err) {
        if (err.name === "ElementClickInterceptedError") {
            // fallback → force JS click
            await this.driver.executeScript("arguments[0].click();", buyNowButton);
        } else {
            throw err;
        }
    }

    await this.driver.wait(until.urlContains('/checkout'), 10000);
  }

}
module.exports = AddProductToCartPage;