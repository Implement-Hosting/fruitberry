module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`[${client.gd("Fruitberry")}] Loaded ${client.gd(client.user.tag)} on ${client.gd(client.guilds.cache.size)} servers`)
	},
};