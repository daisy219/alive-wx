// miniprogram/pages/sportsRenew/sportsRenew.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Services from '../../services/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTimePicker: false,
    pickerDefaultTime: new Date().toTimeString(),
    currentDay: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },
  /**
   * 点击某一天
   */
  dayTouch(val) {
    this.setData({ currentDay: val.detail.date });
  },

  /**
   * 点击补卡
   */
  reNewClick: function() {
    this.setData({ showTimePicker: true });
    // Toast.success('补卡成功！');
  },
  /**
   * 确认选择时间
   */
  async onConfirmChooseTime(event) {
    const params = {
      date: this.data.currentDay,
      time: event.detail,
    }
    try {
      await Services.onAdd('punchRecord', params);
      Toast.success('补卡成功！');

    } catch (err) {
      Toast.fail('补卡失败');
    }
    this.setData({ showTimePicker: false });
  },
  onCloseChooseTime() {
    this.setData({ showTimePicker: false });
  },
  /** 返回 */
  back() {
    wx.switchTab({
      url: '../sports/sports',
    })
  }
})