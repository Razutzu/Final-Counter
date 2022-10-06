module.exports = {
	name: "ready",
	once: true,
	run: (client) => {
		client.success(`${client.user.tag} este pregatit!`);
		client.info("Trimite urmatorul numar corect pe canalul de numarat pentru a incepe.");
	},
};
