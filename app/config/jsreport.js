const jsreport = require("@jsreport/jsreport-core")();

jsreport.use(require('@jsreport/jsreport-chrome-pdf')());
jsreport.use(require('@jsreport/jsreport-ejs')());

(async () => {
    console.log("initializing jsreport");
    try {
        await jsreport.init()
    } catch (err) {
        console.log(err);
    }
})();

module.exports = jsreport;