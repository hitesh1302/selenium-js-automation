require('dotenv').config();
const {expect} = require('chai');
const { getDriver, quitDriver } = require('../utils/driverSetup');
const GetProductFromListPage = require('../pages/getProductFromList');
const ProductDetailPageElements = require('../pages/productDetailPageElement');
const LoginPage = require('../pages/loginPage');

describe ('Get product from product listing page test cases', function (){
    let driver;
    let getProductFromListPage;
    let productDetailPageElements;
    let loginPage;
    
    beforeEach(async function(){
        this.timeout(30000);
        driver = await getDriver();
        getProductFromListPage = new GetProductFromListPage(driver);
        productDetailPageElements = new ProductDetailPageElements(driver);
        loginPage = new LoginPage(driver);
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
        console.log('Quantity increased to :',process.env.QUANTITY);
        await productDetailPageElements.clickOnAddToCartButton();
        await driver.sleep(5000);
        await loginPage.changeToEmail();
        await loginPage.enterUsername(process.env.VALID_USERNAME);
        await loginPage.enterPassword(process.env.VALID_PASSWORD);
        await loginPage.clickLogin();
        await driver.sleep(5000);
    });

});