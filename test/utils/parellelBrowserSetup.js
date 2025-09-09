const { Builder } = require("selenium-webdriver");
require("dotenv").config();

let drivers = {};

async function getDrivers() {
  if (Object.keys(drivers).length === 0) {
    const browsers = (process.env.BROWSERS).split(",");
    for (let browser of browsers) {
      drivers[browser] = await new Builder().forBrowser(browser).build();
    }
  }
  return drivers;
}

async function quitDrivers() {
  for (let browser in drivers) {
    await drivers[browser].quit();
  }
  drivers = {};
}

// ✅ This makes { getDrivers, quitDrivers } available
module.exports = { getDrivers, quitDrivers };
