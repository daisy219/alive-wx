// miniprogram/pages/reading/reading.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    recommendList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid);
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      });
    }
  },
  onQuery: function() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('recommend').get({
      success: res => {
        console.log(res.data);
        this.setData({
          recommendList: res.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'getRecommend',
    //   data: {},
    //   success: res => {
    //     console.log(res);
    //     // wx.navigateTo({
    //     //   url: '../userConsole/userConsole',
    //     // })
    //   },
    //   fail: err => {
    //     console.error('[云函数] [login] 调用失败', err)
    //     // wx.navigateTo({
    //     //   url: '../deployFunctions/deployFunctions',
    //     // })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onQuery();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})