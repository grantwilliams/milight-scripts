#!/usr/bin/env node
const { MilightController } = require("node-milight-promise");
const { commandsV6: commands } = require("node-milight-promise");
const { Config } = require("../config");

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
        commands.fullColor.rgb(Config.zones.all, 255, 193, 131),
        commands.fullColor.brightness(Config.zones.all, 55)
      );
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
    console.log(`Blue light filter turned ${action}`);
    await milight.close();
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
