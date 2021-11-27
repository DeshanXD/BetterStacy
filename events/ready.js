module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        console.log(`${client.user.username} is activated`);
        // set playing activity here
        client.user.setActivity(`With Love`)
	},
};