import './style/base.sass'
import './vendor'

App({
  async getUserInfo () {
    if (this.globalData.userInfo) return this.globalData.userInfo
    const { code } = await wx.loginAsync()
    const { userInfo } = await wx.getUserInfoAsync()

    this.globalData.userInfo = userInfo
  },
  globalData: {
    userInfo: null,
    qiniuCDN: 'https://p09h7s4y2.bkt.clouddn.com',
    serverUrl: 'http://127.0.0.1:3000'
  }
})