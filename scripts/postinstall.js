const fs = require("fs");
const allSets = require("../src/make/allsets");
const configFiles = ["config.client.js", "config.server.js"];
const executeProcess = require("./executeProcess")

// Download Allsets.json
allSets.download(() => {
  executeProcess("src/make/cards");
  executeProcess("src/make/score");
});

console.log("Installing configurations...");
configFiles.forEach(config => {
  if (!fs.existsSync(config)) {
    fs.createReadStream(`config/${config}.default`).pipe(fs.createWriteStream(config));
  }
});
