const Items = require('../../schemas/items')
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('introduce')
        .setDescription('Introduce varias imagenes a la base de datos')
        .addStringOption(option =>
            option.setName('id')
            .setDescription('id del item')
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
        let ItemsProfile = await Items;
        ItemsProfile = await new Items({
            itemId: interaction.options.getString(ItemsProfile.itemId),
            image1: interaction.options.getString(ItemsProfile.image1),
            image2: interaction.options.getString(ItemsProfile.image2),
            image3: interaction.options.getString(ItemsProfile.image3),
        });

        await ItemsProfile.save().catch(console.error);
        console.log("Nuevo registro!");

        if (interaction.options.getString(ItemsProfile.image3)=="") {
            await interaction.reply({
                content: `Imagen 1: ${ItemsProfile.imagen1}`,
                content: `Imagen 2: ${ItemsProfile.imagen2}`
            });
        } else {
            await interaction.reply({
                content: `Imagen 1: ${ItemsProfile.imagen1}`,
                content: `Imagen 2: ${ItemsProfile.imagen2}`,
                content: `Imagen 3: ${ItemsProfile.imagen3}`
            });                
        } 
    },
};