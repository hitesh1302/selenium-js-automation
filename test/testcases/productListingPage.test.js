require('dotenv').config();
const {expect} = require('chai');
const { getDriver, quitDriver } = require('../utils/driverSetup');
const GetProductFromListPage = require('../pages/getProductFromList');
const ProductDetailPageElements = require('../pages/productDetailPageElement');

describe ('Get product from product listing page test cases', function (){
    let driver;
    let getProductFromListPage;
    let productDetailPageElements;
    
    beforeEach(async function(){
        this.timeout(30000);
        driver = await getDriver();
        getProductFromListPage = new GetProductFromListPage(driver);
        productDetailPageElements = new ProductDetailPageElements(driver);
        await getProductFromListPage.open();
    });
   /*afterEach(async function(){
        this.timeout(10000);
        await quitDriver(driver);
    });*/
    
    it('Get product from product listing page', async function(){
        this.timeout(100000);
        await getProductFromListPage.getProductName();
        await driver.sleep(10000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('/product/');
        await productDetailPageElements.addProductWithQuantity();
        await driver.sleep(5000);
        console.log('Quantity increased to 5');
        await productDetailPageElements.clickOnAddToCartButton();
        await driver.sleep(5000);
    });

});