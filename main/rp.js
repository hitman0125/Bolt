import { ActivityType } from 'discord.js';
import os from 'os';  // Import os module for platform information
import { version } from 'discord.js';  // Import discord.js version

export const startBot = (client) => {
  // Clears the console for a fresh look
  console.clear();
  console.log("🔑 Logging in...");
  console.log("🟡 Starting....");
  console.log("✅ Bot logged in, fetching server data...");
  console.log("🔄 Setting bot activity...");

  // Get bot details
  const totalServers = client.guilds.cache.size;
  const totalMembers = client.guilds.cache.reduce(
    (acc, guild) => acc + guild.memberCount,
    0
  );
  const currentTime = new Date().toLocaleString(); // Current time
  const nodeVersion = process.version;
  const discordJsVersion = version;
  const platform = os.platform(); // OS Info

  console.log(`
  ╔════════════════════════════════════════════════╗
  ║ 🚀 BOT STARTED SUCCESSFULLY!                   ║
  ╠════════════════════════════════════════════════╣
  ║ ✅ Logged in as: ${client.user.tag}                     ║
  ║ ⏳ Status: Online                              ║
  ╠════════════════════════════════════════════════╣
  ║ 🔹 Node.js: ${nodeVersion}                           ║
  ║ 🔹 Discord.js: v${discordJsVersion}                        ║
  ║ 🔹 OS: ${platform}                                   ║
  ╠════════════════════════════════════════════════╣
  ║ 🌍 Servers: ${totalServers}                                  ║
  ║ 👥 Total Members: ${totalMembers}                           ║
  ╚════════════════════════════════════════════════╝
  `);
  console.log("🎉 Bot is now fully operational!");

  // Set the bot's rich presence
  client.user.setActivity("/help | Managing the server", {
    type: ActivityType.Watching,

    // Alternative activity types:
  // { type: ActivityType.Playing } → "Playing a game"
  // { type: ActivityType.Streaming, url: "https://twitch.tv/yourchannel" } → "Streaming"
  // { type: ActivityType.Listening } → "Listening to music"
  });

  console.log("🎮 Bot activity set to 'Watching /help | Managing the server'");
};
