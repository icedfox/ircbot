const Downloader = require('./downloader');

const grpc = require('grpc');

const PROTO_PATH = __dirname + '/downloader.proto';
var proto = grpc.load(PROTO_PATH).downloader;
const server = new grpc.Server();

function download (call, callback) {
	
	let d = new Downloader(
	    call.request.botNick,
	    call.request.channelName,
	    process.env.CLIENT_NICKNAME,
	    process.env.DOWNLOAD_DIR
	);

	d.init()
	.then(() => {
		d.download(call.request.botNick, call.request.packId)
		.then(() => {
			callback(null, {
				message: 'Downloading your shit'
			});
		});
	})
	.catch(err => {
		console.error('ERROR "%s"', err);
		callback(err, null);
	});
}

server.addProtoService(proto.DownloaderService.service, {
	download: download
});

server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());
server.start();