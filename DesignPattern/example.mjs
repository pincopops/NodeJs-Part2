class LogConsoleAdapter {
    info(message) {
        console.info(`[INFO] ${message}`);
    }

    error(message) {
        console.error(`[ERROR] ${message}`);
    }
}

import * as fs from "node:fs";

class LogFileAdapter {
    info(message){
        fs.appendFile("output.log", `[INFO] ${message}\n`, (error) => {
            if (error){
                console.error();
            }
        });
    }
    error(message){
        fs.appendFile("output.log", `[ERROR] ${message}\n`, (error) => {
            if (error){
                console.error();
            }
        });
    }
}
const logger = new LogFileAdapter();

logger.info("This is importan information");

logger.error("Something went wrong!");