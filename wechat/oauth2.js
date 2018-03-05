const axios = require('axios')
const appid = 'wxe0220cd8d7ab5de3'
const secret = 'b4479f5da1dd14455d3b23c179a4dee5'
const grant_type = 'authorization_code'

// 用户信息获取类型,需要弹出确认框 可以获取到用户信息
const oauth2_userinfo = async (req, res) => {
	try {
		const code = req.query.code
		const params = {
			appid,
			secret,
			grant_type,
			code
		}
		const get_ast = await axios.get('https://api.weixin.qq.com/sns/oauth2/access_token', {
			params
		})
		console.log(get_ast.data)
		// 这一步已经可以获取到用户的openid了
		const {
			access_token,
			openid
		} = get_ast.data
		const get_userinfo = await axios.get('https://api.weixin.qq.com/sns/userinfo', {
			params: {
				access_token,
				openid
			}
		})


		res.json(get_userinfo.data)
	} catch (err) {

	}
}

// 基础获取类型,不用弹出确认框 只能获取到openid
const oauth2_base = async (req, res) => {
	try {
		const code = req.query.code
		const params = {
			appid,
			secret,
			grant_type,
			code
		}
		const get_ast = await axios.get('https://api.weixin.qq.com/sns/oauth2/access_token', {
			params
		})

		const {
			openid
		} = get_ast.data

		res.end(openid)
	} catch (err) {

	}
}

module.exports = {
	snsapi_userinfo: oauth2_userinfo,
	snsapi_base: oauth2_base
}