# HLogger

healthy logger task.
support the following levels: debug, info, warning, error.
can log to a different targets - file, console.


## Contents

-   [ Install ](#install)
-   [ Configuration ](#configuration)
-   [ Example ](#example)

<a name="install"></a>

## Install

```
npm install hlogger
```

<a name="configuration"></a>

## Configuration

### \<HealthyLogger\>

#### HealthyLogger(options)

-   options _Default: defaultOptions_
    -   level **\<string\>** Valid values: [error, warn, info, debug] _Default: info_
    -   targets **\<Array of ConsoleTarget/FileTarget \>** _Default: ConsoleTarget_ (_**ConsoleTarget** Only one per log instance._)

#### addTarget(target)
  -   target **\<ConsoleTarget/FileTarget \>** **Required** (_**ConsoleTarget** Only one per log instance._)

#### setLoggerLevel(level)
  -   level **\<string\>** **Required** Valid values: [error, warn, info, debug]


#### error(content)

#### warn(content)

#### info(content)

#### debug(content)


### \<ConsoleTarget\>

#### ConsoleTarget(options)

-   options _Default: defaultOptions_
    -   dateFormat **\<string\>** Valid values: [(https://momentjs.com/docs/#/parsing/string-format/)] _Default: DD/MM/YYYY HH:mm:ss_


### \<FileTarget\>

#### FileTarget(options)

-   options _Default: defaultOptions_
    -   fileName **\<string\>** **Required**
    -   dateFormat **\<string\>** Valid values: [(https://momentjs.com/docs/#/parsing/string-format/)] _Default: DD/MM/YYYY HH:mm:ss_

#### setFileNewPath(filepath)
  -   filepath **\<string\>** **Required**

<a name="example"></a>

## Example

You can find a runnable example on `example.js` file.

Another Example:

```
const { HealthyLogger, FileTarget, ConsoleTarget } = require("./HealthyLogger");

const logger1 = new HealthyLogger({
  targets: [
    new ConsoleTarget("HH:mm:ss"),
    new FileTarget({
      dateFormat: "HH:mm:ss",
      fileName: "logs/firstlogfile.log",
    }),
    new FileTarget({
      fileName: "logs/seclogfile.log",
    }),
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
```

Will result in the following.

```
10:55:51 [INFO] logger1 info
10:55:51 [DEBUG] logger1 debug
06/05/2020 10:55:51 [WARN] logger2 warn  
06/05/2020 10:55:51 [ERROR] logger2 error
06/05/2020 10:55:51 [INFO] logger2 info
06/05/2020 10:55:51 [DEBUG] logger2 debug
```
