# HLogger

Logger for node environment.

  support the following levels: debug, info, warning, error.
  can log to a different targets - file, console.


## Contents

-   [ Install ](#install)
-   [ Configuration ](#configuration)
-   [ Example ](#example)

<a name="install"></a>

## Install

```
npm install hiologger
```

<a name="configuration"></a>

## Configuration

### \<HealthyLogger\>

#### HealthyLogger(options)
(_**ConsoleTarget** Only one per log instance._)

```
options:
{
    level: string,
    targets: [targetConfig]
}

targetConfig:
{
    type: string,
    formatDate: string,
    fileName: string
}
```

-   options
    -   **level**
        -   Valid values: [error, warn, info, debug] 
        -   Default: info
    -   **targets - targetConfig** 
        -   Valid values:
            -   type: [file, console] **Required** 
            -   formatDate: [(https://momentjs.com/docs/#/parsing/string-format/)] _Default: DD/MM/YYYY HH:mm:ss_ **(Optional)**
            -   fileName: [any] **(Not optional when type is file)**
        -   Default targets: 
            ```
            [{
            type: 'console',
            formatDate: 'DD/MM/YYYY HH:mm:ss'
            }]
            ```

#### addTarget(targetConfig)
(_**ConsoleTarget** Only one per log instance._)
-   targetConfig  **Required**

#### setLoggerLevel(level)
  -   level **Required** 
    -   Valid values: [error, warn, info, debug]


#### error(content)

#### warn(content)

#### info(content)

#### debug(content)


<a name="example"></a>

## Example

You can find a runnable example on `example.js` file.

Another Example:

```
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
```

Will result in the following.
Console:

```
04/05/2020 14:34:40 [WARN] logger2 warn
04/05/2020 14:34:40 [ERROR] logger2 error
04/05/2020 14:34:40 [INFO] logger2 info
04/05/2020 14:34:40 [DEBUG] logger2 debug
```
File firstlogfile.log:
```
14:34:40 [INFO] logger1 info
14:34:40 [DEBUG] logger1 debug
```
File seclogfile.log:
```
04/05/2020 14:34:40 [INFO] logger1 info
04/05/2020 14:34:40 [DEBUG] logger1 debug
```
