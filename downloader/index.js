const Downloader = require('./downloader')

let d = new Downloader(
    process.env.XDCC_BOT_NICKNAME,
    process.env.CHANNELS.split(','),
    process.env.CLIENT_NICKNAME,
    process.env.DOWNLOAD_DIR
)

d.init()
    .then(() => {
        return d.download(
            process.env.XDCC_BOT_NICKNAME,
            process.env.XDCC_PACK_ID
        )
    })
    .catch(err => console.error('ERROR "%s"', err))