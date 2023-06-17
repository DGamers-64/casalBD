const Items = require('../../schemas/items')
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const mongoose = require('mongoose');
const chalk = require("chalk");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modify')
        .setDescription('Modifica una entrada de la base de datos')
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        )
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
            .setDescription('tercera imagen')),
    async execute(interaction, client) {
        let ItemsProfile = await Items.updateOne({
            itemId: interaction.options.getString('nombre')}, {
                $set : {
                    image1: interaction.options.getString('image1'),
                    image2: interaction.options.getString('image2'),
                    image3: interaction.options.getString('image3'),
            }}).collation({ locale: 'en', strength:2 });

        let findItems = await Items.findOne({itemId: interaction.options.getString('nombre')}).collation({ locale: 'en', strength:2 });

        console.log(chalk.yellow("Registro modificado!"));

        if (!interaction.options.getString('image3')) {
            const embed1 = { title: `${findItems.itemId}`, image: { url: findItems.image1 }, color: 0x00ff00 };
            const embed2 = { image: { url: findItems.image2 }, color: 0x00ff00 };
            await interaction.reply({
                embeds: [embed1, embed2]
            });
        } else {
            const embed1 = { image: { title: `${findItems.itemId}`, url: findItems.image1 }, color: 0x00ff00 };
            const embed2 = { image: { url: findItems.image2 }, color: 0x00ff00 };
            const embed3 = { image: { url: findItems.image3 }, color: 0x00ff00 };
            await interaction.reply({
                embeds: [embed1, embed2, embed3]
            });                
        } 
    },
};