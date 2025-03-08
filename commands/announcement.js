import { EmbedBuilder, MessageFlags } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';  // Import SlashCommandBuilder to create the command

export const data = new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Create an announcement for a specific role');

// Command handler
export async function handleAnnounceModal(interaction) {
    // Check if the interaction is the modal submission
    if (interaction.customId === 'announce_modal') {
        const title = interaction.fields.getTextInputValue('title').trim();
        const content = interaction.fields.getTextInputValue('content').trim();
        const roleId = interaction.fields.getTextInputValue('role_id').trim();

        // Logging the values
        // console.log(`Title: ${title}, Content: ${content}, Role ID: ${roleId}`);

        // Check if the role exists in the guild
        const role = interaction.guild.roles.cache.get(roleId);
        if (!role) {
            return interaction.reply({ content: '❌ Invalid Role ID provided!', flags: MessageFlags.Ephemeral });
        }

        // Prepare the announcement message
        const announcementMessage = `
        🚨 **Attention ${role.toString()}!** 🚨

        🎉 **${title}** 🎉
        ✨ ${content} ✨
        `;

        // Send the message to the channel
        await interaction.channel.send(announcementMessage);
        await interaction.reply({ content: '✅ Announcement created successfully!', flags: MessageFlags.Ephemeral });
    }
}
