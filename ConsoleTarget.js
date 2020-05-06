const moment = require("moment");
const { colors } = require("./consts");

const defaultOptions = {
  dateFormat: "DD/MM/YYYY HH:mm:ss",
};

class ConsoleTarget {
  constructor(options = defaultOptions) {
    this.dateFormat = options.dateFormat || defaultOptions.dateFormat;
  }

  write(info, content) {
    process.stdout.write(
      info.color +
        moment().format(this.dateFormat) +
        " " +
        info.prefix +
        " " +
        content +
        "\n" +
        colors.default
    );
  }
}

module.exports = ConsoleTarget;
