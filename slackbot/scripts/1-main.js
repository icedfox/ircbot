
const grpc = require('grpc')

module.exports = (robot => {
    robot.respond(
        /download movie (.*)/i,
        (res => {
            // res.reply("First i will check if the movie exist.")
            // Check with plex api.
            res.reply("i will search the film.")

            let PROTO_PATH = __dirname + '/search.proto'
            let search_proto = grpc.load(PROTO_PATH).searcher
            let client = new search_proto.Searcher(
                'search:50051',
                grpc.credentials.createInsecure()
            )
            client.search({ query: res.match[1] }, (err, response) => {
                if (err) {
                    robot.logger.error(err)
                }
                else {
                    res.reply(`I will download this release: ${response.name}`)
                }
            })

            // res.reply("Third i will download it.")
            // Download with the microservice downloader.
        })
    )
})