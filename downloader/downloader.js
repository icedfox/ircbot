'use strict';

const ircClient = require('irc-xdcc');

module.exports = class Downloader {
	constructor(ircServer, channels, clientNickname, downloadDir) {
		this.ircServer = ircServer;
		this.channels = channels;
		this.clientNickname = clientNickname;
		this.downloadDir = downloadDir;
	}

	init() {
		let options = {
			channels: this.channels,
			destPath: this.downloadDir,
			autoConnect: true
		};

		return ircClient(
            this.ircServer,
            this.clientNickname,
            options
        )
        .then(instance => {
        	instance.addListener('error', (message) => {
        		console.error('ERROR "%s"', `${JSON.stringify(message, null, 2)}`);
        	});

        	instance.addListener('xdcc-error', (message) => {
        		console.error('ERROR "%s"', message.xdccInfo.error);
        	});

        	instance.addListener('xdcc-created', (message) => {
        		console.log('INFO "%s"', `PackId ${message.xdccInfo.packId} submitted to ${message.xdccInfo.botNick}.`);
        	});

        	instance.addListener('xdcc-progress', (message) => {
        		console.log('INFO "%s"', `Downloading packId ${message.xdccInfo.packId} from ${message.xdccInfo.botNick}.`);
        	});

        	instance.addListener('xdcc-complete', (message) => {
        		console.log('INFO "%s"', `PackId ${message.xdccInfo.packId} from ${message.xdccInfo.botNick} downloaded.`);
        	});

        	instance.addListener('connected', () => {
        		console.log('INFO "%s"', `Connected to ${this.ircServer} in ${this.channel} with ${this.clientNickname}.`);
                            // instance.join(process.env.CHANNELS)
        	});

        	this.instance = instance;

        	return Promise.resolve();
});
	}

	download(botNick, packId) {
		return this.instance.xdcc(
			{
				botNick,
				packId
			}
        );
	}
};