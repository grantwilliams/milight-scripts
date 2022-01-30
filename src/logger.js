const fs = require("fs");

const writeStream = fs.createWriteStream(process.env.MILIGHT_LOG_FILE, {
  flags: "a",
});

process.stdout.write = writeStream.write.bind(writeStream);
process.stderr.write = writeStream.write.bind(writeStream);

const logger = (message) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const timestamp = `${year}-${month}-${day}_${hour}:${minute}:${second}`;
  console.log(`${timestamp}: ${message}`);
};

module.exports = {
  logger,
};
