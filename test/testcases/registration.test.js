require('dotenv').config();
const { getDriver, quitDriver } = require('../utils/driverSetup');
const {expect} = require('chai');
const RegistrationPage = require('../pages/registrationPage');
const { getFakeUser } = require('../utils/fakeData');

describe('Registration page test cases', function () {
    this.timeout(30000);
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
        const fakeUser = getFakeUser();
        await registrationPage.enterFullName(fakeUser.name);
        await registrationPage.selectCountryCode();
        await registrationPage.enterMobileNumber(fakeUser.phone);
        await registrationPage.enterEmail(fakeUser.email);
        await registrationPage.enterPassword(process.env.PASSWORD);
        await registrationPage.enterConfirmPassword(process.env.CONFIRM_PASSWORD);
        await registrationPage.acceptTermsAndConditions();
        await registrationPage.clickRegister();

        const valiationMessage = await registrationPage.getValidationMessage();
        expect(valiationMessage).to.match(/Ghi danh thành công. Vui lòng xác minh email của bạn./);
    });
    it('Register with same email and mobile number', async function() {
        await registrationPage.enterFullName(process.env.FULL_NAME);
        await registrationPage.selectCountryCode();
        await registrationPage.enterMobileNumber(process.env.MNUMBER);
        await registrationPage.enterEmail(process.env.EMAIL_ID);
        await registrationPage.enterPassword(process.env.PASSWORD);
        await registrationPage.enterConfirmPassword(process.env.CONFIRM_PASSWORD);
        await registrationPage.acceptTermsAndConditions();
        await registrationPage.clickRegister();

        const ValidationMessage = await registrationPage.getValidationMessage();
        //console.log("Message is: ", ValidationMessage);
        expect(ValidationMessage).to.match(/Email hoặc số Điện thoại đã tồn tại./);
        
    });
});