const chalk = require("chalk");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(chalk.green(`${client.user.tag} ha sido logueado y se encuentra online.`));
    }
}