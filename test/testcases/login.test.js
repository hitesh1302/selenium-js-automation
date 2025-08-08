require ('dotenv').config();
const { expect } = require ('chai');
const { getDriver, quitDriver } = require('../utils/driverSetup');
const LoginPage = require('../pages/loginPage');

describe('Login page test cases', () => {
    let driver;
    let loginPage;

    before(async () =>{
        driver = await getDriver();
        loginPage = new LoginPage(driver);
        await loginPage.open();
    });
    after(async() => {
        await quitDriver(driver);
    });
    beforeEach(async() => {
        await loginPage.open();
    });
    it('Login with valid credentials', async() =>{
        await loginPage.changeToEmail();
        await loginPage.enterUsername(process.env.VALID_USERNAME);
        await loginPage.enterPassword(process.env.VALID_PASSWORD);
        await loginPage.clickLogin();
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl.includes('/dashboard')).to.be.true;

    
    })
})
