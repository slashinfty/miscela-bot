const fetch = require('node-fetch');
const timestamp = require('internet-timestamp');

module.exports = async (client, calendar) => {
	let response = 'Good morning!\n';
	const res = await fetch('https://api.weather.gov/gridpoints/LWX/110,94/forecast');
	const data = await res.json();
	const periods = data.properties.periods;
	const filtered = periods.filter(p => !p.name.includes('day') && !p.name.includes('Day'));
	response += filtered.reduce((a, b, i) => a += `${i === 0 ? '' : '\n'}${b.name}: ${b.detailedForecast}`, '');
	
	const today = new Date(Date.now());
	const timeMax = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
	const timeMin = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	const res_ = await calendar.events.list({
		'calendarId': 'l2oakd1coc00sfckc361pcrv7g@group.calendar.google.com',
		'timeMax': timestamp(timeMax),
		'timeMin': timestamp(timeMin),
		'orderBy': 'startTime',
		'singleEvents': true
	});
	const data_ = res_.data;
	if (data_.items.length === 0) response += '\nNo events scheduled';
	else {
		data_.items.forEach((event, i) => {
			response += '\n';
			if (event.start.dateTime === undefined) response += 'All Day - ';
			else {
				const date = new Date(event.start.dateTime);
				response += `${date.getHours() % 12 === 0 ? 12 : date.getHours() % 12}:${('0' + date.getMinutes()).substr(-2)}${Math.floor(date.getHours() / 12) === 1 ? 'PM' : 'AM'} - `;
			}
			response +=  `${event.summary}`
		});
	}
	
	const channel = client.channels.cache.get('788520707293315075');
	await channel.send(response);
}
