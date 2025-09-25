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
        //let productName = 'Túi đeo vai Burberry Medium Chess Blanket Bag';
        let productFound = false;
        while (!productFound) {
            const productList =await this.driver.findElements(By.css('#section_home_categories .row.box-gap > .col-xl-2'));
            for (let product of productList){
                const productLink = await product.findElement(By.css("h4 a"));
                const productTitleElement = await productLink.getText();
                console.log(productTitleElement);
                if (productTitleElement.includes(process.env.PRODUCT_NAME)){
                    const actions =this.driver.actions({async:true});
                    await actions.move({origin:product}).perform();
                    await this.driver.sleep(1000);
                    productLink.click();
                    productFound =true;
                    break;
                }
                console.log('Product not found on this page, checking next product...');
            }
         /*   if (!productFound){
                const nextButton = await this.driver.wait(until.elementLocated(By.css("a[aria-label='Next »']")),30000);
                await this.driver.executeScript("arguments[0].scrollIntoView(true);", nextButton);
                const actions =this.driver.actions({async:true});
                await actions.move({origin:nextButton}).perform();
                await this.driver.sleep(1000);
                await nextButton.click();
               // await this.driver.executeScript("arguments[0].click();", nextButton);
                await this.driver.sleep(2000);
            } */
           if (!productFound){
            const modalCloseBtn = await this.driver.findElement(By.xpath("//button[contains(@class,'aiz-cookie-accept') and contains(text(),'Được rồi, Tôi đã hiểu')]"));
            const nextButton = await this.driver.findElement(By.css("a[aria-label='Next »']"));
            if (modalCloseBtn){
                console.log('Modal detected, closing it first...');
                await this.driver.executeScript("arguments[0].scrollIntoView(true);", modalCloseBtn);
                await this.driver.sleep(1000);
                await modalCloseBtn.click();
                await this.driver.sleep(1000);
                const actions =this.driver.actions({async:true});
                await actions.move({origin:nextButton}).perform();
                await this.driver.sleep(1000);
                await nextButton.click();
               // await this.driver.executeScript("arguments[0].click();", nextButton);
                await this.driver.sleep(2000);
            }
            else{
                const nextButton = await this.driver.wait(until.elementLocated(By.css("a[aria-label='Next »']")),30000);
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
}
module.exports = GetProductFromListPage;