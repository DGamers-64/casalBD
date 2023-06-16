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
        let itemProfile = await Items.findOne({itemId: interaction.options.getString('id')});
        if (!itemProfile) {
            await interaction.reply({
                content: `ID no encontrada`
            });

        } else {
            if (!itemProfile.image3) {
            await interaction.reply({
                content: `Id: ${itemProfile.itemId}\n${itemProfile.image1}\n${itemProfile.image2}`
            });
            console.log("Buscada la ID:", itemProfile.itemId);
            } else {
                await interaction.reply({
                    content: `${itemProfile.itemId}\n${itemProfile.image1}\n${itemProfile.image2}\n${itemProfile.image3}`
                });
                console.log(itemProfile);
            }
        }
    },
};