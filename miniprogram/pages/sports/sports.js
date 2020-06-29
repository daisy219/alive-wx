// miniprogram/pages/sports.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Services from '../../services/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {},

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
   * 打卡
   */
  async punch() {
    const params = {
      date: new Date().toLocaleDateString(),
      time: new Date().toTimeString(),
    }
    try {
      await Services.onAdd('punchRecord', params);
      Toast.success('打卡成功！');

    } catch (err) {
      Toast.fail('打卡失败');
    }
  }
})