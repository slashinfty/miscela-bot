const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('forecasthour')
		.setDescription('Forecast for the next N hours')
		.addStringOption(option => option.setName('hours').setDescription('Enter a number of hours (up to 24)').setRequired(true))
	,async execute(interaction) {
		let hours = parseInt(interaction.options.getString('hours'));
		hours = hours > 24 ? 24 : hours;
		const res = await fetch('https://api.weather.gov/gridpoints/LWX/110,94/forecast/hourly');
		const data = await res.json();
		const periods = data.properties.periods;
		let response = '';
		for (let i = 0; i < hours; i++) {
			if (i !== 0) response += '\n';
			const period = periods[i];
			const hour = parseInt(/(?<=T)\d+(?=:)/.exec(period.startTime)[0]);
			response += `${hour % 12 === 0 ? 12 : hour % 12}${Math.floor(hour / 12) === 1 ? 'PM' : 'AM'} - Temp: ${period.temperature}${period.temperatureUnit} - Wind: ${period.windSpeed} - Forecast: ${period.shortForecast}`;
		}
		await interaction.reply(response);
	}
}
