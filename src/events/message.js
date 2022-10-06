const { channelId } = require("../../settings.json");

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
	},
};
