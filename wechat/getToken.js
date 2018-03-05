const request = require('request')
const url = require('url')
const qs = require('querystring')

const appID = 'wxe0220cd8d7ab5de3'
const secret = 'b4479f5da1dd14455d3b23c179a4dee5'
const grant_type = 'client_credential'
var token

const payload = {
	appID,
	secret,
	grant_type
}
const params = qs.stringify(payload)
const baseUrl = 'https://api.weixin.qq.com/cgi-bin/token'
const requsetUrl = baseUrl + '?' + params

function getToken() {
	request.get(requsetUrl, function(err, response, body) {
		console.log(body)
		if (!err) {
			var info = JSON.parse(body)
			token = info.access_token
		}
	})
}

getToken()

// 100分钟刷新一次token
setInterval(getToken, 1000 * 60 * 100)

const func = () => token

module.exports = func