const { SlashCommandBuilder } = require('@discordjs/builders');
const timestamp = require('internet-timestamp');

module.exports = {
	google: true,
	data: new SlashCommandBuilder()
		.setName('getevents')
		.setDescription('Get events for a specified day')
		.addStringOption(option => option.setName('day').setDescription('Enter a date in the form YYYY-MM-DD'))
	,async execute(interaction, calendar) {
		const day = interaction.options.getString('day');
		const dayObject = day === null ? new Date(Date.now()) : new Date(day);
		const timeMax = new Date(dayObject.getFullYear(), dayObject.getMonth(), dayObject.getDate(), 23, 59, 59);
		const timeMin = new Date(dayObject.getFullYear(), dayObject.getMonth(), dayObject.getDate());
		const res = await calendar.events.list({
			'calendarId': 'l2oakd1coc00sfckc361pcrv7g@group.calendar.google.com',
			'timeMax': timeMax,
			'timeMin': timeMin,
			'orderBy': 'startTime',
			'singleEvents': true
		});
		const data = res.data;
		let response = '';
		data.items.forEach((event, i) => {
			if (i !== 0) response += '\n';
			const date = new Date(event.start.dateTime);
			response += `${date.getHours() % 12 === 0 ? 12 : date.getHours() % 12}:${(date.getMinutes() + '0').substr(-2)}${Math.floor(date.getHours() / 12) === 1 ? 'PM' : 'AM'} - ${event.summary}`
		});
		if (response === '') response = 'No events scheduled.'
		await interaction.reply(response);
	}
}
