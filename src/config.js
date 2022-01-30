const zones = {
  main: 1,
  lamp: 2,
  all: 0,
};

const ip = process.env.MILIGHT_IP_ADDRESS;

module.exports = {
  Config: {
    ip,
    zones,
  },
};
