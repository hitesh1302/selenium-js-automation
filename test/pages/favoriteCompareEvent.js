require('dotenv').config();
const {By, until} = require('selenium-webdriver');
const {Actions} = require('selenium-webdriver/lib/input');

class FavoriteCompareEventPage {
    constructor(driver){
        this.driver = driver;
    }
    async open(){
        await this.driver.manage().window().maximize();
        await this.driver.executeScript(`window.location.href = '${process.env.BASE_URL}'`);

        await this.driver.wait(async () => {
            const url = await this.driver.getCurrentUrl();
            return url === process.env.BASE_URL || url === process.env.BASE_URL + '/';
        }, 10000);
    }
    async clickOnHeartIcon(){
         const productCard = await this.driver.wait(
         until.elementLocated(By.xpath("//h4[normalize-space()='Đồng hồ EYKI 41 mm Nam']/ancestor::div[contains(@class,'prod-box')]")),
         15000
        );
        // Scroll to the product card
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", productCard);

        // Hover over card (so button shows up)
        const actions = this.driver.actions({ async: true });
        await actions.move({ origin: productCard }).perform();

        // Wait for the heart icon to be visible and clickable
        await this.driver.wait(until.elementIsVisible(productCard), 5000);

        const heartIcon = await productCard.findElement(By.xpath(".//div[contains(@class,'add-to-fav-icon')]//a"));
        await heartIcon.click();

    }
    async clickOnCompareIcon(){
        const productCard = await this.driver.wait(
        until.elementLocated(By.xpath("//h4[normalize-space()='Đồng hồ EYKI 41 mm Nam']/ancestor::div[contains(@class,'prod-box')]")),
        15000
       );
       // Scroll to the product card
       await this.driver.executeScript("arguments[0].scrollIntoView(true);", productCard);

       // Hover over card (so button shows up)
       const actions = this.driver.actions({ async: true });
       await actions.move({ origin: productCard }).perform();

       const compareIcon = await productCard.findElement(By.xpath(".//div[contains(@class, 'absolute-top-right')]//a[@class='hov-svg-white' and contains(@onclick,'addToCompare')]"));
       // Wait for the compare icon to be visible and clickable
       await this.driver.wait(until.elementIsVisible(compareIcon), 5000);
       await compareIcon.click();
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

    // Return the trimmed text
    return (await errorElement.getText()).trim();
    }

}
module.exports = FavoriteCompareEventPage;
