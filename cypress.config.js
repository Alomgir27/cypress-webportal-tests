const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  projectId: 'y3nfzn',
  viewportWidth: 1200,
  viewportHeight: 660,
  defaultCommandTimeout: 10000,
  chromeWebSecurity: false,



  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
    googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
  },
});
