const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('forecastday')
		.setDescription('Current forecast for a given day of the week')
		.addStringOption(option => option.setName('day').setDescription('Enter a day of the week, or leave blank for today'))
	,async execute(interaction) {
		const day = interaction.options.getString('forecast').toLowerCase();
		const res = await fetch('https://api.weather.gov/gridpoints/LWX/110,94/forecast');
		const data = await res.json();
		const periods = data.properties.periods;
		let response;
		if (day === undefined) {
			const filtered = periods.filter(p => !p.name.includes('day'));
			response = filtered.reduce((a, b, i) => a += `${i === 0 ? '' : '\n'}${b.name}: ${b.detailedForecast}`, '');
		} else {
			const actualDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].find(d => d.toLowerCase().startsWith(day));
			const filtered = periods.filter(p => p.name.includes(actualDay));
			response = filtered.reduce((a, b, i) => a += `${i === 0 ? '' : '\n'}${b.name}: ${b.detailedForecast}`, '');
		}
		await interaction.reply(response);
	}
};
