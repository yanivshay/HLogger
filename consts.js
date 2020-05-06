const colors = {
  default: "\x1b[0m",
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  default: "\x1b[39m",
  lgrey: "\x1b[90m",
  lred: "\x1b[91m",
  lgreen: "\x1b[92m",
  lyellow: "\x1b[93m",
  lblue: "\x1b[94m",
  lmagenta: "\x1b[95m",
  lcyan: "\x1b[96m",
  lwhite: "\x1b[97m",
};

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

module.exports = {
  colors,
  levels,
};
