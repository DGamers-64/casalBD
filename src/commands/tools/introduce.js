const Items = require('../../schemas/items')
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const chalk = require("chalk");

let itemId = 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('introduce')
        .setDescription('Introduce varias imagenes a la base de datos')
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
        let ItemsProfile = await Items;
        ItemsProfile = await new Items({
            itemId: itemId,
            image1: interaction.options.getString('image1'),
            image2: interaction.options.getString('image2'),
            image3: interaction.options.getString('image3'),
        });

        itemId=itemId+1

        await ItemsProfile.save().catch(console.error);
        console.log(chalk.green("Nuevo registro!"));

        if (!interaction.options.getString('image3')) {
            await interaction.reply({
                content: `Imagen 1: ${ItemsProfile.image1}\nImagen 2: ${ItemsProfile.image2}`
            });
        } else {
            await interaction.reply({
                content: `Imagen 1: ${ItemsProfile.image1}\nImagen 2: ${ItemsProfile.image2}\nImagen 3: ${ItemsProfile.image3}`
            });                
        } 
    },
};