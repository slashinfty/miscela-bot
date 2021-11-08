const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('forecastday')
		.setDescription('Current forecast for a given day of the week')
		.addStringOption(option => option.setName('day').setDescription('Enter a day of the week, or leave blank for today'))
	,async execute(interaction) {
		const day = interaction.options.getString('day');
		const res = await fetch('https://api.weather.gov/gridpoints/LWX/110,94/forecast');
		const data = await res.json();
		const periods = data.properties.periods;
		const today = new Date(Date.now());
		const advance = day === null ? 0 : (7 + ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].findIndex(d => d.toLowerCase().startsWith(day.toLowerCase())) - today.getDay()) % 7;
		const filtered = periods.filter(p => (today.getDate() + advance) === (new Date(p.startTime)).getDate() && (new Date(p.startTime)).getHours() >= 6);
		let response = filtered.reduce((a, b, i) => a += `${i === 0 ? '' : '\n'}${b.name}: ${b.detailedForecast}`, '');
		await interaction.reply(response);
	}
};
