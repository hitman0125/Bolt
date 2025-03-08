import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { handleAnnounceModal } from './commands/announcement.js'; // Import the announce handler
import { handleWhitelistModal } from './commands/whitelist.js'; // Import the whitelist handler
import { interactionCreateHandler } from './main/interact.js'; // Import the interaction handler
import { handleHelpCommand } from './commands/help.js'; // Import the help command handler
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import { startBot } from './main/rp.js';  // Importing rp.js where the rich presence is set
import express from 'express';

dotenv.config(); // Load environment variables from .env file

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  startBot(client);  // Call the startBot function to set up rich presence and logs
});

// Use the interactionCreateHandler from the new file
client.on('interactionCreate', interactionCreateHandler);

// Simple express server to keep Replit running
const app = express();
app.get('/', (req, res) => res.send('Bot is running...'));
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


// Log in to Discord using the token from environment variables
client.login(process.env.TOKEN);
