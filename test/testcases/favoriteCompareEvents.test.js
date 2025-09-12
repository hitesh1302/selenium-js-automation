require('dotenv').config();
const {expect} = require('chai');
const { getDriver, quitDriver } = require('../utils/driverSetup');
const LoginPage = require('../pages/loginPage');
const AddProductToCartPage = require('../pages/addProductToCart');
const FavoriteCompareEventPage = require('../pages/favoriteCompareEvent');

describe('Favorite and Compare Events Test Cases', function () {
    let driver;
    let loginPage;
    let favoriteCompareEventPage;
    let addProductToCartPage;

    beforeEach(async function () {
        this.timeout(30000);
        driver = await getDriver();
        loginPage = new LoginPage(driver);
        addProductToCartPage = new AddProductToCartPage(driver);
        favoriteCompareEventPage = new FavoriteCompareEventPage(driver);
        await favoriteCompareEventPage.open();
        });
   afterEach(async function () {
        await quitDriver(driver);

    });
    it('Add event to favorite as a non-logged in user', async function () {
        this.timeout(50000);
        await favoriteCompareEventPage.clickOnHeartIcon();
        const errorMessage = await favoriteCompareEventPage.getErrorMessage();
        console.log(errorMessage);
        expect(errorMessage).to.match(new RegExp(process.env.LIKE_ERROR_MESSAGE));
    });
    it('Add event to compare as a non-logged in user', async function () {
        this.timeout(50000);
        await favoriteCompareEventPage.clickOnCompareIcon();
        this.timeout(100000);
        const errorMessage = await favoriteCompareEventPage.getErrorMessage();
        console.log(errorMessage);
        expect(errorMessage).to.match(new RegExp(process.env.COMPARE_VALIDATION_MESSAGE));
    });
});