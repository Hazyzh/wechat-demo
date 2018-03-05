const request = require('request')
const token = require('./getToken.js')
require('colors')


const redirect_uri1 = encodeURIComponent('http://hazyzh.com/wechat2')
const redirect_uri2 = encodeURIComponent('http://hazyzh.com/wechat3')
const url1 = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe0220cd8d7ab5de3&redirect_uri=" + redirect_uri1 + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
const url2 = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe0220cd8d7ab5de3&redirect_uri=" + redirect_uri2 + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"

const menu = {
    "button": [{
        "type": "click",
        "name": "今日歌曲a",
        "key": "V1001_TODAY_MUSIC"
    }, {
        "name": "菜单",
        "sub_button": [{
            "type": "view",
            "name": "搜索",
            "url": "http://www.soso.com/"
        }, {
            "type": "view",
            "name": "获取用户信息",
            "url": url1
        }, {
            "type": "view",
            "name": "只获取openid",
            "url": url2
        }]
    }]
}


const createMenu = () => {
    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token()}`
    request.post(url, {
        form: JSON.stringify(menu)
    }, (err, response, body) => {
        if (!err && JSON.parse(body).errcode === 0) {
            console.log('create meun success !'.green)
            console.log('meun is '.red, menu)
        } else {
            console.log('error !!'.red, err)
        }
        process.exit()
    })
}

const createFun = () => {
    if (token()) {
        console.log('create menu begin !'.green)
        createMenu()
    } else {
        setTimeout(createFun, 100)
    }
}

createFun()