#!/usr/bin/env node
const Milight = require("node-milight-promise");
const { commandsV6: commands } = require("node-milight-promise");
const { Config } = require("./config");

const milight = new Milight.MilightController({
  ip: Config.ip,
  type: "v6",
});

const zone = 1;
const waitMinute = () => new Promise((res) => setTimeout(res, 1000));

console.log(`Starting sunrise alarm at ${new Date().toLocaleString()}`);

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
  .then(() => {
    console.log(`Finished sunrise alarm at ${new Date().toLocaleString()}`);
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
