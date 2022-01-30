#!/usr/bin/env node
const { MilightController } = require("node-milight-promise");
const { commandsV6: commands } = require("node-milight-promise");
const { Config } = require("../config");
const { logger } = require("../logger");

const milight = new MilightController({
  ip: Config.ip,
  type: "v6",
});

const action = process.argv[2];

(async () => {
  await milight.ready();

  switch (action) {
    case "on":
      milight.sendCommands(
        commands.fullColor.on(Config.zones.lamp),
        commands.fullColor.whiteMode(Config.zones.lamp),
        commands.fullColor.brightness(Config.zones.lamp, 55)
      );
      milight.sendCommands(commands.fullColor.off(Config.zones.main));
      break;

    case "off":
      milight.sendCommands(
        commands.fullColor.on(Config.zones.main),
        commands.fullColor.whiteMode(Config.zones.main),
        commands.fullColor.brightness(Config.zones.main, 100)
      );
      milight.sendCommands(commands.fullColor.off(Config.zones.lamp));
      break;
  }
})()
  .then(async () => {
    logger(`Bedtime light turned ${action}`);
    await milight.close();
    process.exit(0);
  })
  .catch((e) => {
    logger(e);
    process.exit(1);
  });
