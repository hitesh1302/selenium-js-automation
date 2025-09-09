require ('dotenv').config();
const { expect } = require ('chai');
const { getDrivers, quitDrivers } = require('../utils/parellelBrowserSetup');
const LoginPage = require('../pages/parellelRunLoginPage');

describe('Login page test cases', () => {
    let drivers;
    let loginPage;

   beforeEach(async function () {
        drivers = await getDrivers();
        loginPage = new LoginPage(drivers);
        this.timeout(40000);
        await loginPage.open();
    });
    afterEach(async function () {
        await quitDrivers();
    }); 
    it('Login with valid credentials using mobile number', async() => {
        for (let browser in this.drivers){
        await loginPage.selectCountryCode();
        await loginPage.enterMobileNumber(process.env.VALID_MNUMBER);
        await loginPage.enterPassword(process.env.VALID_PASSWORD);
        await loginPage.clickLogin();
        const currentUrl = await drivers[browser].getCurrentUrl();
        expect(currentUrl.includes('/dashboard')).to.be.true;
        }
    });
});
