require('dotenv').config();
const { getDriver, quitDriver } = require('../utils/driverSetup');
const {expect} = require('chai');
const RegistrationPage = require('../pages/registrationPage');

describe('Registration page test cases', () => {
    let driver;
    let registrationPage;

    beforeEach(async function () {
        this.timeout(30000);
        driver = await getDriver();
        registrationPage = new RegistrationPage(driver);
        await registrationPage.open();
    });
    afterEach(async function () {
        await quitDriver(driver);
    });

    it('Register with valid details', async function () {
        await registrationPage.enterFullName(process.env.FULL_NAME);
        await registrationPage.selectCountryCode();
        await registrationPage.enterMobileNumber(process.env.MNUMBER);
        await registrationPage.enterEmail(process.env.EMAIL);
        await registrationPage.enterPassword(process.env.PASSWORD);
        await registrationPage.enterConfirmPassword(process.env.CONFIRM_PASSWORD);
        await registrationPage.acceptTermsAndConditions();
        await registrationPage.clickRegister();

        const valiationMessage = await registrationPage.getValidationMessage();
        expect(valiationMessage).to.match(/Ghi danh thành công. Vui lòng xác minh email của bạn./);
    });
});