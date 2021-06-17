const secret = '1417856569'
const http = require('http')
const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/webhook', secret })
const axios = require('axios')
const db = require('./db')
const instance = axios.create()

http.createServer(async function (req, res) {
    if (req.url.includes('/uploadInfo')) {
        res.writeHead(200, {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE'
        })
        let name = getQueryString('name', req.url)
        let url = getQueryString('url', req.url)
        try {
            await db.add_one({ name, url })
        } catch (e) {
            return res.end('fail')
        }
        res.statusCode = 200
        return res.end('ok')
    }
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(9089)

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('push', async function (event) {
    try {
        let { url } = await db.get_one(event.payload.repository.full_name)
        instance.post(url, {
            category: 'APP_CARD',
            data: {
                icon_url: event.payload.sender.avatar_url,
                title: `${event.event} for ${event.payload.repository.full_name}`,
                description: event.payload.head_commit.message,
                action: event.payload.head_commit.url,
            }
        })
    } catch (e) {
        console.log(e)
    }
})

handler.on('issues', function (event) {
    console.log('Received an issue event for %s action=%s: #%d %s',
        event.payload.repository.name,
        event.payload.action,
        event.payload.issue.number,
        event.payload.issue.title)
})

function getQueryString(name, url) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = url.substr(12).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}