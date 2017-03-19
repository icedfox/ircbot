'use strict'

const request = require('request')
const grpc = require('grpc');

function sendSearchJob(query) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            url: `https://ixirc.com/api?pn=1&q=${escape(query)}`,
            followAllRedirects: true
        }, (err, response) => {
            if (err) {
                reject(err)
            } else {
                if (response.statusCode == 200) {
                    resolve(response.body)
                } else {
                    reject(new Error(response.body))
                }
            }
        })
    })
}

var PROTO_PATH = __dirname + '/search.proto';

var search_proto = grpc.load(PROTO_PATH).searcher;

function search(call, callback) {
    sendSearchJob(call.request.query)
        .then(resp => {
            let a = JSON.parse(resp).results[0]
            let b = {
                name: a.name,
                irc_server_addr: a.naddr,
                xdcc_pack_id: a.nid.toString(),
                xdcc_bot_nickname: a.uname,
                channel_name: a.cname,
            }

            console.log(JSON.stringify(b, null, 2))
            callback(null, b);
        })
}

function main() {
    let server = new grpc.Server();
    server.addProtoService(search_proto.Searcher.service, { search: search });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();