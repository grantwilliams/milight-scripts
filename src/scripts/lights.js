#!/usr/bin/env node
const { MilightController } = require("node-milight-promise");
const { commandsV6: commands } = require("node-milight-promise");
const { Config } = require("../config");
const { logger } = require("../logger");

const milight = new MilightController({
  ip: Config.ip,
  type: "v6",
});

const zone = process.argv[2];
const action = process.argv[3];
const percentage = process.argv[4];

(async () => {
  await milight.ready();
  switch (action) {
    case "on":
      milight.sendCommands(
        commands.fullColor.on(zone),
        commands.fullColor.whiteMode(zone),
        commands.fullColor.brightness(zone, 100)
      );
      break;

    case "off":
      milight.sendCommands(commands.fullColor.off(zone));
      break;

    case "dim":
    case "bright":
    case "brighten":
      milight.sendCommands(commands.fullColor.brightness(zone, percentage));
      break;
  }
})()
  .then(async () => {
    logger(
      `Turned zone ${zone} ${action}${percentage ? ` to ${percentage}` : ""}`
    );
    await milight.close();
    process.exit(0);
  })
  .catch((e) => {
    logger(e);
    process.exit(1);
  });
