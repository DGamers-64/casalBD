const chalk = require("chalk");

module.exports = {
    name: "connected",
    execute() {
        console.log(chalk.yellow("[Database Status]: Connected."));
    },
};