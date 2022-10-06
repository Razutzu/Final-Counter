const { channelId, timeout } = require("../../settings.json");

module.exports = {
	name: "message",
	once: false,
	run: (client, message) => {
		if (message.channel.id != channelId) return;

		if (message.author.id == client.user.id && client.lastNumber == null && !isNaN(message.content)) {
			client.lastNumber = Number(message.content);
			client.ready = true;

			client.info(`${client.user.tag} incepe sa numere!`);
		}

		if (!client.ready) return;

		if (message.author.id == client.user.id) return;
		if (message.author.id == client.lastAuthor) return;

		if (isNaN(message.content)) return client.info(`${message.author.tag}: ${message.content}`);

		let number = Number(message.content);
		if (number != client.lastNumber + 1) return;

		client.lastNumber = number;

		if (client.timeout) return;
		client.timeout = true;

		message.channel.startTyping().catch((err) => client.err(err));
		setTimeout(() => {
			if (client.user.id == client.lastAuthor) return;

			client.lastNumber += 1;
			message.channel.send(client.lastNumber).catch((err) => client.err(err));
			client.timeout = false;

			message.channel.stopTyping().catch((err) => client.err(err));
		}, timeout);
	},
};
