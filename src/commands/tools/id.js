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
        let ItemsProfile = await Items.findOne({itemId: interaction.options.getString('id')}).collation({ locale: 'en', strength:2 });

        if (!ItemsProfile) {
            await interaction.reply({
                content: `ID no encontrada`
            });
            console.log(chalk.cyan("Buscada la ID:", interaction.options.getString('id')));
        } else {
            if (!ItemsProfile.image3) {
                const embed1 = { title: `${ItemsProfile.itemId}`, image: { url: ItemsProfile.image1 }, color: 0x00ff00 };
                const embed2 = { image: { url: ItemsProfile.image2 }, color: 0x00ff00 };
                if (ItemsProfile.desc) {
                    await interaction.reply({
                        content: ItemsProfile.desc,
                        embeds: [embed1, embed2]
                    });
                } else {
                    await interaction.reply({
                        embeds: [embed1, embed2]
                    });
                }
                console.log(chalk.cyan("Buscada la ID:", interaction.options.getString('id')));
            } else {
                const embed1 = { image: { title: `${ItemsProfile.itemId}`, url: ItemsProfile.image1 }, color: 0x00ff00 };
                const embed2 = { image: { url: ItemsProfile.image2 }, color: 0x00ff00 };
                const embed3 = { image: { url: ItemsProfile.image3 }, color: 0x00ff00 };
                if (ItemsProfile.desc) {
                    await interaction.reply({
                        content: ItemsProfile.desc,
                        embeds: [embed1, embed2, embed3]
                    });
                } else {
                    await interaction.reply({
                        embeds: [embed1, embed2, embed3]
                    });
                }
                console.log(chalk.cyan("Buscada la ID:", interaction.options.getString('id')));
            }
        }
    },
};