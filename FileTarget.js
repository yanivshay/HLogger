const moment = require("moment");
const fs = require("fs");
const path = require("path");

const defaultOptions = {
  fileName: "",
  dateFormat: "DD/MM/YYYY HH:mm:ss",
};

// Creates folder for the requested log file (If not exists)
const createLogsDirectory = (logsDirPath) => {
  if (!fs.existsSync(logsDirPath)) {
    fs.mkdirSync(logsDirPath, { recursive: true });
  }
};

// Handles the case where the path is absolute or relative
const handleFilePath = (file) => {
  const isAnAbsolutePath =
    file.startsWith("/") || file.substring(1).startsWith(":/");
  const logDirectoryPathTmp = file.split("/");
  logDirectoryPathTmp.pop();
  const logDirectoryPath = logDirectoryPathTmp.join("/");

  const absoluteLogDirectoryPath = isAnAbsolutePath
    ? logDirectoryPath
    : path.join(process.cwd(), logDirectoryPath);
  createLogsDirectory(absoluteLogDirectoryPath);

  const absoluteFilePath = isAnAbsolutePath
    ? file
    : path.join(process.cwd(), file);

  return absoluteFilePath;
};

class FileTarget {
  constructor(options = defaultOptions) {
    if (!options.fileName || options.fileName === "") {
      throw new Error("Must specify file name for the logger");
    }

    this.fileName = handleFilePath(options.fileName);
    this.dateFormat = options.dateFormat || defaultOptions.dateFormat;
  }

  write(info, content) {
    fs.appendFile(
      this.fileName,
      moment().format(this.dateFormat) +
        " " +
        info.prefix +
        " " +
        content +
        "\n",
      (err) => {
        if (err) throw err;
      }
    );
  }
}

module.exports = FileTarget;
