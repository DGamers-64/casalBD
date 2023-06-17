const Items = require('../../schemas/items')
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('Devuelve la lista'),
    async execute(interaction, client) {
        let ItemsProfile = await Items.find({}, {_id: 0, itemId: 1});
        if (ItemsProfile.length === 0) {
            await interaction.reply("No hay elementos en la lista");
        } else {
            var resultado = ItemsProfile.map(function(elemento, indice) {
                var elementoFormateado = JSON.stringify(elemento).slice(11, -2);
                return (indice + 1) + '. ' + elementoFormateado;
            });
            var respuesta = resultado.join('\n');
            await interaction.reply(respuesta);
        };
    },
};