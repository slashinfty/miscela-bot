const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, './.env') });

const commandPath = require('path').resolve(__dirname, './commands');

const commands = require('fs').readdirSync(commandPath).filter(file => file.endsWith('.js')).map(file => require(require('path').resolve(commandPath, `./${file}`)).data.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationCommands(process.env.DISCORD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
.catch(console.error);
