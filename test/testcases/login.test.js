require ('dotenv').config();
const { expect } = require ('chai');
const { getDriver, quitDriver } = require('../utils/driverSetup');
const LoginPage = require('../pages/loginPage');

describe('Login page test cases', () => {
    let driver;
    let loginPage;

   /* before(async () =>{
        driver = await getDriver();
        loginPage = new LoginPage(driver);
        await loginPage.open();
    });

    beforeEach(async () => {
    await driver.manage().deleteAllCookies();   // clear session
    await loginPage.open()
    });

    after(async() => {
        await quitDriver(driver);
    }); 
    */
   beforeEach(async () =>{
        driver = await getDriver();
        loginPage = new LoginPage(driver);
        await loginPage.open();
    });
    afterEach(async() => {
        await quitDriver(driver);
    }); 
    it('Login with valid credentials', async() => {
        await loginPage.changeToEmail();
        await loginPage.enterUsername(process.env.VALID_USERNAME);
        await loginPage.enterPassword(process.env.VALID_PASSWORD);
        await loginPage.clickLogin();
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl.includes('/dashboard')).to.be.true;
    
    });
    it('Login with invalid credentials', async() => {
        await loginPage.changeToEmail();
        await loginPage.enterUsername(process.env.INVALID_USERNAME);
        await loginPage.enterPassword(process.env.INVALID_PASSWORD);
        await loginPage.clickLogin();
        //const currentUrl = await driver.getCurrentUrl();
        //expect(currentUrl.includes('/dashboard')).to.be.false; 
        const errorMessage = await loginPage.getErrorMessage();
        console.log(errorMessage);
        expect(errorMessage).to.match(/Thông tin Đăng nhập không hợp lệ/);
    });
    it('Login with valid credentials using mobile number', async() => {
        await loginPage.selectCountryCode();
        await loginPage.enterMobileNumber(process.env.VALID_MNUMBER);
        await loginPage.enterPassword(process.env.VALID_PASSWORD);
        await loginPage.clickLogin();
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl.includes('/dashboard')).to.be.true;
    })

    it('Login with Invalid mobile number', async() => {
        await loginPage.selectCountryCode();
        await loginPage.enterMobileNumber(process.env.INVALID_MNUMBER);
        await loginPage.enterPassword(process.env.INVALID_PASSWORD);
        await loginPage.clickLogin();
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).to.match(/Thông tin Đăng nhập không hợp lệ/);
    });
});
