#!/usr/bin/env node
const { MilightController } = require("node-milight-promise");
const { commandsV6: commands } = require("node-mimilight-promise");
const { Config } = require("../config");

const milight = new MilightController({
  ip: Config.ip,
  type: "v6",
});

const getRandom = () => {
  return Math.floor(Math.random() * 256);
};

let zone = 0;
(async () => {
  await milight.ready();

  const changeColor = () => {
    zone = zone == 1 ? 2 : 1;
    const r = getRandom();
    const g = getRandom();
    const b = getRandom();
    milight.sendCommands(commands.fullColor.rgb(zone, r, g, b));

    setTimeout(changeColor, 200);
  };

  milight.sendCommands(
    commands.fullColor.on(zone),
    commands.fullColor.whiteMode(zone),
    commands.fullColor.brightness(zone, 100)
  );

  setTimeout(changeColor, 1000);
})();
