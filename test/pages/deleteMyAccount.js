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
    }
    async clickCancelDeleteMyAccountButton(){
        const deleteDialog = await this.driver.wait(until.elementLocated(By.id("account_delete_confirm")),10000);
        const cancelBtn = await deleteDialog.findElement(By.xpath("//button[normalize-space(text())='Hủy bỏ']"));
        await this.driver.executeScript("arguments[0].click();", cancelBtn);

    }
    async clickConfirmDeleteMyAccountButton(){
        const deleteDialog = await this.driver.wait(until.elementLocated(By.id("account_delete_confirm")),10000);
        const confirmDeleteBtn = await deleteDialog.findElement(By.id("account_delete_link"));
        await this.driver.executeScript("arguments[0].click();", confirmDeleteBtn);
    }
}
module.exports = DeleteMyAccountPage;