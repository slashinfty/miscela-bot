const { Client, Collection, Intents } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, './.env') });

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = require('fs').readdirSync(require('path').resolve(__dirname, './commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) client.commands.set(require(`./commands/${file}`).data.name, require(`./commands/${file}`));

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
