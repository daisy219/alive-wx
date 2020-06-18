// miniprogram/pages/reading/reading.js
const app = getApp()
import Services from '../../services/index';
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

  /** 获取推荐列表 */
  async onQuery() {
    const result = await Services.onQuery('recommend');
    this.setData({
      recommendList: result.data
    });
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