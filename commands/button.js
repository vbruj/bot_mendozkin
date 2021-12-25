module.exports = {
    name: 'button',
    callback: async({ message }) => {
        const { MessageActionRow, MessageButton } = require('discord.js');
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
            );

        await interaction.reply({ content: 'Pong!', components: [row] });
    }
}