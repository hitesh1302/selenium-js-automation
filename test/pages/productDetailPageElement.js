require('dotenv').config();
const {By, until} = require('selenium-webdriver');

class ProductDetailPageElements {
    constructor(driver){
        this.driver=driver;
    }
    async addProductWithQuantity(){
        let quantity = 5;
        const inputQuantity = await this.driver.findElement(By.css('input[type="number"]')).getAttribute('value');
        console.log('Product quantity is:',inputQuantity);
        if(inputQuantity<quantity){
            for (let i=0;i<quantity-1;i++){
                const increaseBtn = await this.driver.findElement(By.css("button[data-type='plus']"));
                const actions =this.driver.actions({async:true});
                await actions.move({origin:increaseBtn}).perform();
                await this.driver.sleep(1000);
                await increaseBtn.click();
            }

            }
    }
    async clickOnAddToCartButton(){
        const addToCartBtn = await this.driver.findElement(By.css("button[type='button')], contains(text(),'Add to Cart')]"));
        await addToCartBtn.click();
}
}
module.exports = ProductDetailPageElements;