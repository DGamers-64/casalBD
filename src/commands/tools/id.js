const Items = require('../../schemas/items')
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require("mongoose");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('id')
    .setDescription('Devuelve información de un item')
    .addStringOption(option =>
        option.setName('id')
            .setDescription('id del objeto')
            .setRequired(true)),
    async execute(interaction, client) {
        let itemProfile = await Items;
        if (!itemProfile) {
            await interaction.reply({
                content: `ID no encontrada`
            });

        } else {
            await interaction.reply({
                content: `Server ID: ${itemProfile.itemId}`
            });
            console.log(itemProfile);
        }
    },
};