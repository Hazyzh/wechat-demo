const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// wechat
const wechat = require('./wechat/wechat.js')
const xmlparser = require('express-xml-bodyparser')
const oauth2 = require('./wechat/oauth2.js')
app.use((req, res, next) => {
	console.log(req.url)
	next()
})
app.use(xmlparser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.text({
	type: 'text/xml'
})) //for xml

app.get('/wechat', wechat.get)
app.post('/wechat', xmlparser({
	trim: true,
	explicitArray: false
}), wechat.post)
app.get('/wechat2', oauth2.snsapi_userinfo)
app.get('/wechat3', oauth2.snsapi_base)

const server = app.listen(80, function() {
	const info = server.address()
	const host = info.address
	const port = info.port

	console.log('Example app listening at http://%s:%s', host, port)
})

// for host /c/Windows/System32/drivers/etc