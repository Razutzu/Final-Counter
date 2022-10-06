const { Client } = require("discord.js-self");

const { token } = require("../settings.json");

const client = new Client();

client.w = "\033[0m";
client.r = "\033[31m";
client.g = "\033[32m";
client.b = "\033[34m";
client.y = "\033[33m";

client.ready = false;
client.timeout = false;

client.lastAuthor = null;
client.lastNumber = null;

client.log = (color, tag, msg) => {
	switch (color.toLowerCase()) {
		case "r":
			console.log(`${client.r}[${tag}]${client.w} ${msg}`);
			break;
		case "g":
			console.log(`${client.g}[${tag}]${client.w} ${msg}`);
			break;
		case "b":
			console.log(`${client.b}[${tag}]${client.w} ${msg}`);
			break;
	}
};

client.success = (msg) => client.log("g", "SUCCESS", msg);
client.info = (info) => client.log("b", "INFO", info);
client.err = (err) => client.log("r", "ERROR", err.stack);
client.warn = (warning) => client.log("y", "WARNING", warning);

require("./handlers/events")(client);

client.login(token);

process.on("uncaughtException", (err) => {
	if (err.stack.includes("MessageCreate")) {
		client.info("Message event crashed, restarting...");
		client.on("message", (message) => require("./events/message").run(client, message));
	}
});
