require('dotenv').config();
const { By, until } = require('selenium-webdriver');

class DeleteMyAccountPage {
    constructor(driver) {
        this.driver =driver;
    }

    async open(){
        await this.driver.manage().window().maximize();
        await this.driver.get(process.env.BASE_URL + 'users/delete');
    }
    async clickDeleteMyAccountTextLink(){
        const deleteMyAccountTextLink = await this.driver.wait(until.elementLocated(By.xpath("//a[.//span[normalize-space()='Xóa tài khoản của tôi']]")), 10000);
        await this.driver.executeScript("arguments[0].click();", deleteMyAccountTextLink);
       // await this.driver.actions({ bridge: true }).move({ origin: deleteMyAccountTextLink }).perform();
       // await deleteMyAccountTextLink.click();
    }
}
module.exports = DeleteMyAccountPage;