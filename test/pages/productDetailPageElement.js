require('dotenv').config();
const {By, until} = require('selenium-webdriver');

class ProductDetailPageElements {
    constructor(driver){
        this.driver=driver;
    }
    async addProductWithQuantity(){
        //let quantity = 1;
        const inputQuantity = await this.driver.findElement(By.css('input[type="number"]')).getAttribute('value');
        console.log('Product quantity is:',inputQuantity);
        if(inputQuantity<process.env.QUANTITY){
            for (let i=0;i<process.env.QUANTITY-1;i++){
                const increaseBtn = await this.driver.findElement(By.css("button[data-type='plus']"));
                const actions =this.driver.actions({async:true});
                await actions.move({origin:increaseBtn}).perform();
                await this.driver.sleep(1000);
                await increaseBtn.click();
            }

            }
    }
    async clickOnAddToCartButton(){
        const addToCartBtn = await this.driver.wait(until.elementLocated(By.xpath("//button[i[contains(@class,'las la-shopping-bag')] and contains(normalize-space(),'Thêm vào giỏ hàng')]")),2000);
        const actions =this.driver.actions({async:true});
        await actions.move({origin:addToCartBtn}).perform();
        //await this.driver.sleep(1000);
        await addToCartBtn.click();
}
}
module.exports = ProductDetailPageElements;