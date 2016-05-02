// Selenium Grid url
var seleniumGridUrl = 'http://192.168.99.100:4444/wd/hub';

// Create a new instance of WebDriver
var webDriver = require('selenium-webdriver');

// Provides wrappers around the following global functions from Mocha's BDD interface
var test = require('selenium-webdriver/testing');

function beforeTest(done) {
    // We declare that we want to run the test on Chrome + Linux
    var capabilities = new webDriver.Capabilities().
    set(webDriver.Capability.BROWSER_NAME, webDriver.Browser.CHROME).
    set(webDriver.Capability.PLATFORM, 'LINUX');

    // Create the connection through WebDriver to the Selenium Grid
    driver = new webDriver.Builder()
        .withCapabilities(capabilities)
        .usingServer(seleniumGridUrl)
        .build();

    driver.manage().window().maximize();
    driver.get("http://phptravels.net/").then(done);
}

function afterTest(done) {
    driver.quit().then(done);
}

function makeSuite(desc, cb) {
    test.describe(desc, function() {
        this.timeout(60000);
        test.beforeEach(beforeTest);
        cb();
        test.afterEach(afterTest);
    });
}

exports.makeSuite = makeSuite;