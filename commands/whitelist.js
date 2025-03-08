import { SlashCommandBuilder, MessageFlags, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('whitelist')
  .setDescription('Whitelist a user. Requires role permission.');

export async function handleWhitelistModal(interaction) {
  if (interaction.customId === 'whitelist_modal') {
    const discordId = interaction.fields.getTextInputValue('discord_id').trim();
    const approvalStatus = interaction.fields.getTextInputValue('approval_status').trim().toLowerCase();

    if (!discordId) {
      return interaction.reply({ content: '❌ Please provide a valid Discord ID.', flags: MessageFlags.Ephemeral });
    }

    let user;
    try {
      user = await interaction.client.users.fetch(discordId);
    } catch (error) {
      return interaction.reply({ content: '❌ Invalid Discord ID provided!', flags: MessageFlags.Ephemeral });
    }

    let embed;
    if (approvalStatus === 'approved') {
      embed = new EmbedBuilder()
        .setTitle('✅ Whitelist Approved')
        .setDescription(`🎉 **A new user has been whitelisted!** \n\n👤 **User:** <@${discordId}>\n\n✨ **Happy Roleplay!** 🎭🎉\n\n`)
        .setColor(0x00ff00)
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setImage('https://cdn.discordapp.com/attachments/1345664301427462217/1345731439915831379/standard.gif')
        .setFooter({ text: 'Bolt', iconURL: 'https://cdn.discordapp.com/attachments/1345664301427462217/1347803516478951434/bolt_anim_pic.gif?ex=67cd2757&is=67cbd5d7&hm=d5e8148f900f5b1933596553ed3c5b3d7e09c412f3c8ded1249326266eb00c95&.gif' })
        .setTimestamp();
    } else if (approvalStatus === 'rejected') {
      embed = new EmbedBuilder()
        .setTitle('❌ Whitelist Rejected')
        .setDescription(`🚫 **User <@${discordId}> has been rejected!**\n\n ✨**Feel free to re-apply again.**🎭\n\n`)
        .setColor(0xff0000)
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setImage('https://cdn.discordapp.com/attachments/1345664301427462217/1345731439915831379/standard.gif')
        .setFooter({ text: 'Bolt', iconURL: 'https://cdn.discordapp.com/attachments/1345664301427462217/1347803516478951434/bolt_anim_pic.gif?ex=67cd2757&is=67cbd5d7&hm=d5e8148f900f5b1933596553ed3c5b3d7e09c412f3c8ded1249326266eb00c95&.gif' })
        .setTimestamp();
    } else {
      return interaction.reply({ content: '❌ Please enter either "Approved" or "Rejected".', flags: MessageFlags.Ephemeral });
    }

    await interaction.channel.send({ embeds: [embed] });
    await interaction.reply({ content: '✅ Action recorded!', flags: MessageFlags.Ephemeral });
  }
}
