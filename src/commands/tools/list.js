const Items = require('../../schemas/items')
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('Devuelve la lista'),
    async execute(interaction, client) {
        let itemProfile = await Items.find({itemId: {$gt: 0}}, {_id: 0, itemId: 1});
        await interaction.reply({
            content: `Id: ${itemProfile}`
        });
    },
};