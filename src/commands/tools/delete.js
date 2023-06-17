const Items = require('../../schemas/items')
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');
const chalk = require("chalk");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Borra una entrada')
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        )
        .addStringOption(option =>
            option.setName('nombre')
            .setDescription('nombre (id)')
            .setRequired(true)),
    async execute(interaction, client) {
        let ItemsProfile = await Items;
        ItemsProfile = await new Items({
            itemId: interaction.options.getString('nombre'),
        });

        if (!interaction.options.getString('nombre')) {
            await interaction.reply({
                content: "No existe esa ID"
            });
        } else {
            await Items.deleteOne({"itemId": `${interaction.options.getString('nombre')}`})
            await interaction.reply({
                content: `Eliminado registro ${interaction.options.getString('nombre')}`
            });
            console.log(chalk.red(`Eliminado registro ${interaction.options.getString('nombre')}`));
        } 
    },
};