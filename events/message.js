module.exports = {
	name: 'message',
	execute(message, client) {

		const prefix = '!'

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.commands.get(commandName);

		if (!client.commands.has(commandName)) return;
		
		try {
			command.execute(message, args);
		} catch (error) {
			console.log(`[${client.gd("Fruitberry")}] Found ${client.gd("error")} in the ${client.gd("command handler")} (${client.gd(error)})`)
		}
		
	},
};