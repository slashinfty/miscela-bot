const { SlashCommandBuilder } = require('@discordjs/builders');
const timestamp = require('internet-timestamp');

module.exports = {
	google: true,
	data: new SlashCommandBuilder()
		.setName('getevents')
		.setDescription('Get events for a specified day')
		.addStringOption(option => option.setName('day').setDescription('Enter a date in the form MM/DD/YY'))
	,async execute(interaction, calendar) {
		const day = interaction.options.getString('day');
		let dayObject;
		if (day === null) dayObject = new Date(Date.now());
		else {
			const arr = day.split('/').map(e => parseInt(e));
			dayObject = new Date(arr[2] + 2000, arr[0] - 1, arr[1]);
		}
		const timeMax = new Date(dayObject.getFullYear(), dayObject.getMonth(), dayObject.getDate(), 23, 59, 59);
		const timeMin = new Date(dayObject.getFullYear(), dayObject.getMonth(), dayObject.getDate());
		const res = await calendar.events.list({
			'calendarId': 'l2oakd1coc00sfckc361pcrv7g@group.calendar.google.com',
			'timeMax': timestamp(timeMax),
			'timeMin': timestamp(timeMin),
			'orderBy': 'startTime',
			'singleEvents': true
		});
		const data = res.data;
		let response = '';
		data.items.forEach((event, i) => {
			if (i !== 0) response += '\n';
			if (event.start.dateTime === undefined) response += 'All Day - ';
			else {
				const date = new Date(event.start.dateTime);
				response += `${date.getHours() % 12 === 0 ? 12 : date.getHours() % 12}:${('0' + date.getMinutes()).substr(-2)}${Math.floor(date.getHours() / 12) === 1 ? 'PM' : 'AM'} - `;
			}
			response +=  `${event.summary}`
		});
		if (response === '') response = 'No events scheduled.'
		await interaction.reply(response);
	}
}
