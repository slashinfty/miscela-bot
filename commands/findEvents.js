const { SlashCommandBuilder } = require('@discordjs/builders');
const timestamp = require('internet-timestamp');

module.exports = {
	google: true,
	data: new SlashCommandBuilder()
		.setName('findevents')
		.setDescription('Search for future events')
		.addStringOption(option => option.setName('query').setDescription('Term/phrase to search for').setRequired(true))
	,async execute(interaction, calendar) {
		const query = interaction.options.getString('query');
		const dayObject = new Date(Date.now());
		const timeMin = new Date(dayObject.getFullYear(), dayObject.getMonth(), dayObject.getDate());
		const res = await calendar.events.list({
			'calendarId': 'l2oakd1coc00sfckc361pcrv7g@group.calendar.google.com',
			'timeMin': timestamp(timeMin),
			'orderBy': 'startTime',
			'singleEvents': true,
			'maxResults': 10,
			'q': query
		});
		const data = res.data;
		let response = '';
		data.items.forEach((event, i) => {
			if (i !== 0) response += '\n';
			if (event.start.dateTime === undefined) {
				const arr = event.start.date.split('-').map(e => parseInt(e));
				const date = new Date(arr[0], arr[1] - 1, arr[2]);
				response += `${date.getMonth() + 1}/${date.getDate()} - All Day`
			} else {
				const date = new Date(event.start.dateTime);
				response += `${date.getMonth() + 1}/${date.getDate()} - ${date.getHours() % 12 === 0 ? 12 : date.getHours() % 12}:${('0' + date.getMinutes()).substr(-2)}${Math.floor(date.getHours() / 12) === 1 ? 'PM' : 'AM'}`;
			}
			response += ` - ${event.summary}`;
		});
		if (response === '') response = 'No events scheduled.'
		await interaction.reply(response);
	}
}
