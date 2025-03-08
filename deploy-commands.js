// import 'dotenv/config';
// import { REST, Routes, SlashCommandBuilder } from 'discord.js';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Get the current directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const commands = [];
// const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
//     const command = await import(`./commands/${file}`); // Use dynamic import to support ES modules
//     console.log(command); // To check what is being exported

//     if (command.data) {
//         commands.push(command.data.toJSON());
//     } else {
//         console.warn(`Command in ${file} does not export 'data' correctly.`);
//     }
// }

// const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// (async () => {
//     try {
//         console.log('Registering slash commands...');
//         await rest.put(
//             Routes.applicationCommands(process.env.CLIENT_ID),
//             { body: commands }
//         );
//         console.log('✅ Slash commands registered!');
//     } catch (error) {
//         console.error('Error registering commands:', error);
//     }
// })();


import { REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const commands = [];
const commandFiles = fs.readdirSync(path.join(process.cwd(), 'commands')).filter(file => file.endsWith('.js'));

// Add the commands from the files
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  if (command.data) {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');
    
    // Registering the commands
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log('✅ Slash commands registered successfully!');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})();
