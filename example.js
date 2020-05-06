const HealthyLogger = require("./HealthyLogger");

const logger1 = new HealthyLogger({
  targets: [
    {
      type: "file",
      dateFormat: "HH:mm:ss",
      fileName: "logs/firstlogfile.log",
    },
    {
      type: "file",
      fileName: "logs/seclogfile.log",
    },
  ],
});

const logger2 = new HealthyLogger({
  level: "error",
});

logger1.warn("logger1 warn");
logger1.error("logger1 error");
logger1.info("logger1 info");
logger1.debug("logger1 debug");

logger2.warn("logger2 warn");
logger2.error("logger2 error");
logger2.info("logger2 info");
logger2.debug("logger2 debug");

logger1.addTarget({ type: "console" });
// logger2.addTarget({ type: "file", fileName: "logs/kaha.log" });

logger1.info("logger1 another log");
// logger2.info("logger2 another log");
