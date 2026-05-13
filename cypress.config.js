const { defineConfig } = require('cypress')

module.exports = defineConfig({
  experimentalModifyObstructiveThirdPartyCode: true,
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
  video: false
})
