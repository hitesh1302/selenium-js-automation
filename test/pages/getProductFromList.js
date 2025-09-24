require('dotenv').config();
const {By, until} = require('selenium-webdriver');

class GetProductFromListPage {
    constructor(driver) {
        this.driver = driver;
    }

    async open(){
        await this.driver.manage().window().maximize();
        await this.driver.get(process.env.BASE_URL +'category/hot-deals-x2fsi');
    }
    async getProductName(){
        let productName = 'Túi đeo vai Burberry Medium Chess Blanket Bag';
        let productFound = false;
        while (!productFound) {
            const productList =await this.driver.findElements(By.css('#section_home_categories .row.box-gap > .col-xl-2'));
            for (let product of productList){
                const productTitleElement = await product.getText();
                console.log(productTitleElement);
                if (productTitleElement.includes(productName)){
                    const actions =this.driver.actions({async:true});
                    await actions.move({origin:product}).perform();
                    product.click();
                    productFound =true;
                    break;
                }
                console.log('Product not found on this page, checking next product...');
            }
            if (!productFound){
                const nextButton = await this.driver.wait(until.elementLocated(By.css("a[aria-label='Next »']")),30000);
                await this.driver.wait(until.elementIsVisible(nextButton), 10000);
                await this.driver.wait(until.elementIsEnabled(nextButton), 10000);
                await this.driver.executeScript("arguments[0].scrollIntoView(true);", nextButton);
                const actions =this.driver.actions({async:true});
                await actions.move({origin:nextButton}).perform();
                await this.driver.sleep(1000);
                await nextButton.click();
               // await this.driver.executeScript("arguments[0].click();", nextButton);
                await this.driver.sleep(2000);
            }
        }
    }
}
module.exports = GetProductFromListPage;