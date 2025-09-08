require ('dotenv').config();
const {expect} = require('chai');
const { getDriver, quitDriver } = require('../utils/driverSetup');
const AddProductToCartPage = require('../pages/addProductToCart');
const LoginPage = require('../pages/loginPage');

describe ('Add product to cart test cases', function (){
    let driver;
    let loginPage;
    let addProductToCartPage;

    beforeEach(async function(){
        this.timeout(30000);
        driver = await getDriver();
        loginPage = new LoginPage(driver);
        addProductToCartPage = new AddProductToCartPage(driver);
        await loginPage.open();
        await loginPage.selectCountryCode();
        await loginPage.enterMobileNumber(process.env.VALID_MNUMBER);
        await loginPage.enterPassword(process.env.VALID_PASSWORD);
        await loginPage.clickLogin();
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl.includes('/dashboard')).to.be.true;

    });
    /*afterEach(async function(){
        await quitDriver(driver);
    });*/
    
    it('Add product to cart', async function(){
        this.timeout(50000);
        await addProductToCartPage.open();
        this.timeout(100000);
        await addProductToCartPage.clickOnAddToCartButton();
        await addProductToCartPage.clickAlertAddCartBtn();
    });


});