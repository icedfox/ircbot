'use strict';

const irc = require('irc');

const channels = [
	'#moviegods',
	'#mg-chat'
];

const client = new irc.Client(
	'irc.rizon.net', 
	'Borrows', { 
		channels 
	});