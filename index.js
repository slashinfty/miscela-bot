const { Client, Collection, Intents } = require('discord.js');
const { google } = require('googleapis');
const CronJob = require('cron').CronJob;

const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, './.env') });

const oauth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URL
)

const googleTokens = JSON.parse(require('fs').readFileSync(require('path').resolve(__dirname, './googleTokens.json')));

oauth2Client.setCredentials({
 	refresh_token: googleTokens.refresh_token
});

const calendar = google.calendar({
	version: 'v3',
	auth: oauth2Client
});

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

const job = require(require('path').resolve(__dirname, './job.js'));
const daily = new CronJob('0 0 5 * * *', () => job(client, calendar), null, true);

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

	if (!command) return;

    try {
        if (command.hasOwnProperty('google')) await command.execute(interaction, calendar);
        else await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Oops! Something went wrong.', ephemeral: true });
    }
});

oauth2Client.on('tokens', tokens => {
	if (tokens.refresh_token) googleTokens.refresh_token = tokens.refresh_token;
	googleTokens.access_token = tokens.access_token;
	require('fs').writeFileSync(require('path').resolve(__dirname, './googleTokens.json'), JSON.stringify(googleTokens));
});

client.login(process.env.DISCORD_TOKEN);
