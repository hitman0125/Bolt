import { InteractionType } from 'discord.js';
import { handleAnnounceModal } from '../commands/announcement.js'; // Import the announce handler
import { handleWhitelistModal } from '../commands/whitelist.js'; // Import the whitelist handler
import { handleHelpCommand } from '../commands/help.js'; // Import the help command handler

export const interactionCreateHandler = async (interaction) => {
  // Check role-based permission
  const requiredRoleId = process.env.ROLE_ID; // Get the required role ID from the environment variable
  if (!interaction.member.roles.cache.has(requiredRoleId)) {
    return interaction.reply({ content: '❌ You do not have permission to use this command.', ephemeral: true });
  }

  // Handle slash commands
  if (interaction.type === InteractionType.ApplicationCommand) {
    if (interaction.commandName === 'announce') {
      const modal = {
        customId: 'announce_modal',
        title: 'Announcement Modal',
        components: [
          {
            type: 1,
            components: [
              {
                type: 4, // Text Input
                customId: 'title',
                label: 'Title of the Announcement',
                style: 1, // Short input
                placeholder: 'Enter the title here...',
                required: true,
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: 4, // Text Input
                customId: 'content',
                label: 'Content of the Announcement',
                style: 2, // Long input
                placeholder: 'Enter the content here...',
                required: true,
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: 4, // Text Input
                customId: 'role_id',
                label: 'Role ID to Tag',
                style: 1, // Short input
                placeholder: 'Enter the role ID here...',
                required: true,
              },
            ],
          },
        ],
      };

      await interaction.showModal(modal);
    }

    if (interaction.commandName === 'whitelist') {
      const modal = {
        customId: 'whitelist_modal',
        title: 'Whitelist User Modal',
        components: [
          {
            type: 1,
            components: [
              {
                type: 4, // Text Input
                customId: 'discord_id',
                label: 'Enter Discord ID of the User',
                style: 1, // Short input
                placeholder: 'Enter the Discord ID here...',
                required: true,
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: 4, // Text Input
                customId: 'approval_status',
                label: 'Type "Approved" or "Rejected":',
                style: 1, // Short input
                placeholder: 'Approved / Rejected',
                required: true,
              },
            ],
          },
        ],
      };

      await interaction.showModal(modal);
    }

    // Add /help command handling here
    if (interaction.commandName === 'help') {
      await handleHelpCommand(interaction); // Call the help command handler
    }
  }

  // Handle modal submissions
  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'announce_modal') {
      await handleAnnounceModal(interaction);
    }
    if (interaction.customId === 'whitelist_modal') {
      await handleWhitelistModal(interaction);
    }
  }
};
