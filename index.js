const { Client, Collection, Intents } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, './.env') });

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commandPath = require('path').resolve(__dirname, './commands');

client.commands = new Collection();
const commandFiles = require('fs').readdirSync(commandPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(require('path').resolve(commandPath, `./${file}`));
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`Miscela Bot is live @ ${new Date().toTimeString()} on ${new Date().toDateString()}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

	if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Oops! Something went wrong.', ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);
