const Items = require('../../schemas/items')
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const chalk = require("chalk");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('introduce')
        .setDescription('Introduce varias imagenes a la base de datos')
        .addStringOption(option =>
            option.setName('nombre')
            .setDescription('nombre (id)')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('image1')
            .setDescription('primera imagen')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('image2')
            .setDescription('segunda imagen')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('image3')
            .setDescription('tercera imagen'))
        .addStringOption(option =>
            option.setName('desc')
            .setDescription('descripcion')),
    async execute(interaction, client) {
        let ItemsProfile = await Items;
        ItemsProfile = await new Items({
            author: interaction.user.username,
            itemId: interaction.options.getString('nombre'),
            image1: interaction.options.getString('image1'),
            image2: interaction.options.getString('image2'),
            image3: interaction.options.getString('image3'),
            desc:   interaction.options.getString('desc'),
        });

        await ItemsProfile.save().catch(console.error);
        console.log(chalk.green("Nuevo registro!"));

        if (!interaction.options.getString('image3')) {
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
        } 
    },
};