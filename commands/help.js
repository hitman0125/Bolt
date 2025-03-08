// import { EmbedBuilder, MessageFlags, SlashCommandBuilder } from 'discord.js';

// export const data = new SlashCommandBuilder()
//   .setName('help')
//   .setDescription('Displays a list of available commands');

// export const handleHelpCommand = async (interaction) => {
//   const helpEmbed = new EmbedBuilder()
//     .setColor('#0099ff') 
//     .setTitle('Available Commands')
//     .setDescription('Here are the commands you can use with the bot:')
//     .addFields(
//       { name: '/announce', value: 'Create an announcement. Requires role permission.' },
//       { name: '/whitelist', value: 'Whitelist a user. Requires role permission.' },
//       { name: '/help', value: 'Displays this help message.' }
//     )
//     .setFooter({ text: 'Bot created by [Your Name]' });

//   await interaction.reply({ embeds: [helpEmbed], flags: MessageFlags.Ephemeral });
// };


import { EmbedBuilder, MessageFlags, SlashCommandBuilder } from 'discord.js';

// Define the slash command data
export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Displays a list of available commands and their descriptions');

// Command handler for the `/help` command
export const handleHelpCommand = async (interaction) => {
  // Define the categories for the commands, using emojis to enhance them
  const adminCommands = [
    { name: '📢 /announce', description: 'Create an announcement.' },
    { name: '✅ /whitelist', description: 'Whitelist a user.' },
    { name: '❓ /help', description: 'Displays this help message.' }
  ];

  // const adminCommands = [
  //   { name: '⚔️ /ban', description: 'Ban a user from the server. Requires admin permission.' },
  //   { name: '👢 /kick', description: 'Kick a user from the server. Requires admin permission.' }
  // ];

  // Create the embed for the help message
  const helpEmbed = new EmbedBuilder()
    .setColor('#00BFFF')  // You can change this to a custom color
    .setTitle('Bot Help: Available Commands')
    .setDescription('Below is the list of commands available for use. Click on any command for more details!')
    .addFields(
      { name: '**Admin Commands**', value: adminCommands.map(cmd => `${cmd.name} - ${cmd.description}`).join('\n'), inline: true }
      //{ name: '**Admin Commands**', value: adminCommands.map(cmd => `${cmd.name} - ${cmd.description}`).join('\n'), inline: true }
    )
    .setFooter({ text: 'Bolt', iconURL: 'https://cdn.discordapp.com/attachments/1345664301427462217/1347803516478951434/bolt_anim_pic.gif?ex=67cd2757&is=67cbd5d7&hm=d5e8148f900f5b1933596553ed3c5b3d7e09c412f3c8ded1249326266eb00c95&.gif'})
    .setTimestamp();

  // Send the embed with ephemeral flag to ensure it's only visible to the user who invoked the command
  await interaction.reply({ embeds: [helpEmbed], flags: MessageFlags.Ephemeral });
};

