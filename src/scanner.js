const fs = require("fs");
const path = require("path");

function scanManualExtensions(dir) {
  const manualExtensions = new Set();
  const regex = /\b(rv_[a-z0-9]+|z[a-z0-9]+|[a-z])\b/gi;

  function scan(d) {
    const files = fs.readdirSync(d);

    files.forEach((file) => {
      const fullPath = path.join(d, file);

      if (fs.statSync(fullPath).isDirectory()) {
        scan(fullPath);
      } else if (file.endsWith(".adoc")) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const matches = content.match(regex);

        if (matches) {
          matches.forEach((ext) => manualExtensions.add(ext.toLowerCase()));
        }
      }
    });
  }

  scan(dir);
  return manualExtensions;
}

module.exports = { scanManualExtensions };
