const Items = require('../../schemas/items')
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('id')
    .setDescription('Devuelve información de un item')
    .addStringOption(option =>
        option.setName('id')
            .setDescription('id del objeto')
            .setRequired(true)),
    async execute(interaction, client) {
        let itemProfile = await Items.findOne({itemId: interaction.options.getString('id')});
        if (!itemProfile) {
            await interaction.reply({
                content: `ID no encontrada`
            });
            console.log(chalk.cyan("Buscada la ID:", interaction.options.getString('id')));
        } else {
            if (!itemProfile.image3) {
            await interaction.reply({
                content: `Id: ${itemProfile.itemId}\nImagen 1: ${itemProfile.image1}\nImagen 2: ${itemProfile.image2}`
            });
            console.log(chalk.cyan("Buscada la ID:", interaction.options.getString('id')));
            } else {
                await interaction.reply({
                    content: `Id: ${itemProfile.itemId}\nImagen 1: ${itemProfile.image1}\nImagen 2:${itemProfile.image2}\nImagen 3: ${itemProfile.image3}`
                });
                console.log(chalk.cyan("Buscada la ID:", interaction.options.getString('id')));
            }
        }
    },
};