const fs = require("fs");

const writeStream = fs.createWriteStream(process.env.MILIGHT_LOG_FILE, {
  flags: "a",
});

process.stdout.write = writeStream.write.bind(writeStream);
process.stderr.write = writeStream.write.bind(writeStream);
