const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Get a quote from Bender')
	,async execute(interaction) {
		const quotes = [
			'001100010010011110100001101101110011',
			'Awwww, its anus looks like an asterisk!',
			"Ah, computer dating. It's like pimping, but you rarely have to use the phrase 'upside your head'.",
			'And the awkward meter goes up another notch. Ding-ding-ding-ding.',
			'Are all the tests gonna involve drinking?',
			'Behold, the internet.',
			"Bender knows love, and love doesn't share itself with the world. Love is suspicious, love is needy. Love is fearful, love is greedy. My friends, there is no great love without great jealousy! I love you meatbags!",
			"Bender must be stoped!  I've gone too far!  Who does that guy think I am!?",
			'Bite my shiny metal ass.',
			'Dumb-Dumb away!',
			'Emotions are dumb and should be hated.',
			"Finally, we made it out of that godforsaken cave! So what's the fastest way home, back through the cave?",
			'Fry! Quit doing the right thing, you jerk!',
			"Granted, it's not on the list of approved bendables, but I'm... so... great!",
			'Hasta la vista, Meatbag!',
			'Have you ever tried just turning off the TV, sitting down with your children, and hitting them?',
			"Here's your Gutenberg Bible, masters, plus the Colonel's Secret Recipe: Chicken, Grease, Salt!",
			"Hey, I don't tell you how to tell me what to do, so don't tell me how to do what you tell me to do!",
			'Hey that punk stole our hood ornament! Now no one will know we have the LX Package!',
			"Hey, what kinda party is this? There's no booze and only one hooker.",
			'Humans are dumb and they die easy.',
			"Humans dating robots is sick. You people wonder why I'm still single? It's 'cause all the fine robot sisters are dating humans!",
			'I decline the title of Iron Cook and accept the lesser title of Zinc Saucier, which I just made up. Uhh... also, comes with double prize money.',
			"I don't blame myself, I blame all of you!",
			'I guess if you want children beaten, you have to do it yourself.',
			"I'm Bender, please insert liquor!",
			"I love this planet! I've got wealth, fame, and access to the depths of sleaze that those things bring.",
			"I'm sorry, guys. I never meant to hurt you. Just to destroy everything you ever believed in.",
			'Into the breach meatbags...or not. Whatever.',
			'I support and oppose many things, but not strongly enough to pick up a pen.',
			"It's not all about money; although I would like much much more.",
			"It's not on the list of approved bendable materials but...  I'm...  the...  greatest!",
			'I was having a Martini drinking contest with the autopilot.  I would have had him this time but we ran out of olives.',
			"Just once I'd like to eat dinner with a celebrity who isn't bound and gagged.",
			'Nailed it!',
			"No, he's not a zombie. But I don't want people to think I'm incompetent, so I'd better kill you just to be sure.",
			"No. I'm going to be a stalker.",
			"No! I want to live! There's still too many things I don't own!",
			"No, that's a hobo and a rabbit, but they're making a hobbit.",
			"Of all the friends I've had... you're the first.",
			'Robot 1-X, save my friends! And Zoidberg!',
			"Sweet photons. I don't know if you're waves or particles, but you go down smooth!",
			'Then a damned army we shall have!',
			"There's gas in our ass!",
			"Watcha doin', mini-meatbags? Underage gambling? Shame on you. Count me in",
			"Well if the League of Robots isn't real, how come I had a whole sticker-book of 'em when I was younger? Answer that with your precious logic!",
			"Well, we're boned!",
			"While I was hacking off the Professor's hand with an extremely dull saw, I had time to think. Who could use a doomsday device more, the scammers, or me, Bender? After several minutes of steady sawing, I had the answer. Me, Bender!",
			"You may have to 'metaphorically' make a deal with the 'devil.' And by 'devil,' I mean Robot Devil. And by 'metaphorically,' I mean get your coat.",
			'Your best is an idiot!'
		];
		await interaction.reply(quotes[Math.floor(Math.random() * quotes.length))]);	
	}
}
