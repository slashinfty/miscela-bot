const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const dotenv = require('dotenv');
dotenv.config();

const commands = require('fs').readdirSync('./commands').filter(file => file.endsWith('.js')).map(file => require(`./commands/${file}`).data.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
.catch(console.error);
