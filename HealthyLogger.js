const { colors, levels } = require("./consts");
const ConsoleTarget = require("./ConsoleTarget");
const FileTarget = require("./FileTarget");

const defaultOptions = {
  level: "info",
  targets: [{ type: "console" }],
};

// Help method that checks whether to log or not the incoming log
const checkLoggerLevel = (loggerLevel, levelOfLog) => {
  return loggerLevel <= levelOfLog;
};

const initializeLevelsMap = (levelInfo) => {
  levelInfo.set(levels["error"], {
    color: colors.lred,
    prefix: "[ERROR]",
  });

  levelInfo.set(levels["warn"], {
    color: colors.lyellow,
    prefix: "[WARN]",
  });

  levelInfo.set(levels["info"], {
    color: colors.lblue,
    prefix: "[INFO]",
  });

  levelInfo.set(levels["debug"], {
    color: colors.lgreen,
    prefix: "[DEBUG]",
  });
};

class HealthyLogger {
  constructor(options = defaultOptions) {
    const loggerTargets = options.targets || defaultOptions.targets;
    this._level = options.level || defaultOptions.level;
    this._logToConsole = false;
    this._targets = [];

    loggerTargets.forEach((t) =>
      t.type === "console" ? this.addTarget(t) : this.addTarget(t)
    );

    this._levelInfo = new Map();
    initializeLevelsMap(this._levelInfo);
  }

  /**
   * @param {Object} targetConfig
   * @param {string} targetConfig.type type of target
   * @param {string} [targetConfig.dateFormat] date format
   * @param {string} [targetConfig.filePath] file path - NOT optional when type is file
   */
  addTarget(targetConfig) {
    let target;
    switch (targetConfig.type) {
      case "console":
        if (!this._logToConsole) {
          target = new ConsoleTarget(targetConfig);
          this._logToConsole = true;
        } else {
          throw new Error(
            "Console target already exists, only one console target is allowed"
          );
        }
        break;
      case "file":
        target = new FileTarget(targetConfig);
        break;
      default:
        break;
    }

    target && this._targets.push(target);
  }

  // Set the logger's minimum log level
  setLoggerLevel(level) {
    this._level = level;
  }

  error(content) {
    const lvl = levels["error"];
    checkLoggerLevel(levels[this._level], lvl) &&
      this._targets.forEach((target) => {
        target.write(this._levelInfo.get(lvl), content);
      });
  }

  warn(content) {
    const lvl = levels["warn"];
    checkLoggerLevel(levels[this._level], lvl) &&
      this._targets.forEach((target) => {
        target.write(this._levelInfo.get(lvl), content);
      });
  }

  info(content) {
    const lvl = levels["info"];
    checkLoggerLevel(levels[this._level], lvl) &&
      this._targets.forEach((target) => {
        target.write(this._levelInfo.get(lvl), content);
      });
  }

  debug(content) {
    const lvl = levels["debug"];
    checkLoggerLevel(levels[this._level], lvl) &&
      this._targets.forEach((target) => {
        target.write(this._levelInfo.get(lvl), content);
      });
  }
}

module.exports = HealthyLogger;
