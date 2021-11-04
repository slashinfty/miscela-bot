const { google } = require('googleapis');
const rl = require('readline-sync');

const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, './.env') });

const oauth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URL
)

const authProcess = async () => {
	const url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: [
			'https://www.googleapis.com/auth/calendar',
			'https://www.googleapis.com/auth/calendar.events',
			'https://www.googleapis.com/auth/calendar.events.readonly',
			'https://www.googleapis.com/auth/calendar.readonly'
		]
	});
	console.log(url);
	const code = rl.question('Code: ');
	
	const { tokens } = await oauth2Client.getToken(code);
	console.log(tokens);
	require('fs').writeFileSync(require('path').resolve(__dirname, './googleTokens.json'), JSON.stringify(tokens));
}

authProcess();
