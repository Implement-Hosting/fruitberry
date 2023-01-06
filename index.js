const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config({path:'./config/.env'});


client.commands = new Discord.Collection();
client.gd = require('gradient-string').summer;
client.config = require('./config/config.json')

const commandFolders = fs.readdirSync('./commands');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

if(process.env.TOKEN == "insertToken") { return console.log(`[${client.gd("Fruitberry")}] Please ${client.gd("change")} the ${client.gd("default token")} inside ${client.gd("config > .env > TOKEN")}`) } else {
    client.login(process.env.TOKEN)
}
