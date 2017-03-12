'use strict';

const irc = require('irc');

const channels = [
	// '#moviegods',
	// '#mg-chat'
];

/*{
    userName: 'nodebot',
    realName: 'nodeJS IRC client',
    port: 6667,
    localAddress: null,
    debug: false,
    showErrors: false,
    autoRejoin: false,
    autoConnect: true,
    channels: [],
    secure: false,
    selfSigned: false,
    certExpired: false,
    floodProtection: false,
    floodProtectionDelay: 1000,
    sasl: false,
    retryCount: 0,
    retryDelay: 2000,
    stripColors: false,
    channelPrefixes: "&#",
    messageSplit: 512,
    encoding: ''
}*/

const options = {
	channels: channels,
	autoConnect: false
};

const client = new irc.Client(
	'irc.rizon.no', 
	'Borrows',
	options
);


const retryCount = 99;

client.connect(retryCount, function() {
	console.log('here');
});