require('dotenv').config();
const {getDriver, quitDriver} = require('../utils/driverSetup');
const LoginPage = require('../pages/loginPage');
const DeleteMyAccountPage = require('../pages/deleteMyAccount');
const { expect } = require('chai');

describe ('Delete My Account Test', function () {
    let driver;
    let loginPage;
    let deleteMyAccountPage;

    beforeEach(async function () {
        this.timeout(30000);
        driver = await getDriver();
        loginPage = new LoginPage(driver);
        deleteMyAccountPage = new DeleteMyAccountPage(driver);
        await loginPage.open();
        await loginPage.changeToEmail();
        await driver.sleep(1000);
        await loginPage.enterUsername(process.env.VALID_USERNAME);
        await loginPage.enterPassword(process.env.VALID_PASSWORD);
        await loginPage.clickLogin();
    });
    /*afterEach(async function () {
        await quitDriver(driver);
    });*/   

    it('Verify that user can delete their account successfully', async function () {
        this.timeout(20000);
        await deleteMyAccountPage.clickDeleteMyAccountTextLink();
        await driver.switchTo().alert().accept();
});
});