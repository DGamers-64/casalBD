const Items = require('../../schemas/items')
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cache')
    .setDescription('Reinicia la caché del bot (puede llevar 1h)')
    .setDefaultMemberPermissions(
        PermissionFlagsBits.Administrator
    ),
    async execute(interaction, client) {
        client.application.commands.set([]);
        guild.commands.set([]);
    },
};