const Items = require('../../schemas/items')
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Muestra la ayuda del bot'),
    async execute(interaction, client) {
        const embed = { color: 0x00ff00, title: "HELP", description: `/introduce : Introduce una nueva entrada a la base de datos (las imágenes deben de ser links)\n/id : Consulta una entrada\n/delete : Borra una entrada (solo admins)\n/list : Muestra una lista de todas las entradas\n/modify : Modifica una entrada (solo admins)\n/ping : Muestra la latencia del bot y del usuario` };
        await interaction.reply({
            embeds: [embed]
        });
    },
};