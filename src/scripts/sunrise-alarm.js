#!/usr/bin/env node
const { MilightController } = require("node-milight-promise");
const { commandsV6: commands } = require("node-milight-promise");
const { Config } = require("../config");
const { logger } = require("../logger");

const milight = new MilightController({
  ip: Config.ip,
  type: "v6",
});

const zone = 1;
const waitMinute = () => new Promise((res) => setTimeout(res, 1000 * 60));

logger(`Starting sunrise alarm`);

(async () => {
  await milight.ready();
  milight.sendCommands(
    commands.fullColor.on(zone),
    commands.fullColor.brightness(zone, 0)
  );
  for (const [index] of new Array(101).fill(null).entries()) {
    milight.sendCommands(
      commands.fullColor.brightness(zone, index),
      commands.fullColor.whiteMode(zone)
    );
    await waitMinute();
  }
})()
  .then(async () => {
    logger(`Finished sunrise alarm`);
    await milight.close();
    process.exit(0);
  })
  .catch((e) => {
    logger(e);
    process.exit(1);
  });
