const { Builder} = require ('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('dotenv').config();

let driver;
let options = new chrome.Options();
 // Prevent Chrome's "Change your password" bubble
  options.addArguments("--disable-popup-blocking");
  options.addArguments("--disable-notifications");
  options.addArguments("--disable-infobars");
  options.addArguments("--password-store=basic");
  options.addArguments("--disable-features=AutofillServerCommunication,PasswordManagerOnboarding,PasswordLeakDetection");

  // Disable password manager + credentials service
  options.setUserPreferences({
    "credentials_enable_service": false,
    "profile.password_manager_enabled": false,
    "safebrowsing.enabled": false,
    "safebrowsing.disable_download_protection": true,
    "profile.password_manager_leak_detection": false
  });   


async function getDriver() {

    if (!driver)
    {
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    }
    return driver;
}

async function quitDriver() {
    if(driver)
    {
        await driver.quit();
        driver = null;
    } 
}   
module.exports = {getDriver, quitDriver};

