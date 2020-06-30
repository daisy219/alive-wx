// miniprogram/pages/sportsRecord/sportsRecord.js
import Services from '../../services/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    recordList: [],
    timeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecordList();
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
  dayTouch(val) {
    const timeList = this.data.list.filter(a => a.date === val.detail.date).map(a => a.time);
    this.setData({timeList :timeList});
  },
  /**
   * 获取打卡记录
   */
  async getRecordList() {
    const result = await Services.onQuery('punchRecord');
    this.setData({list: result.data});
    this.setData({recordList: result.data.map(a => a.date)});
    console.log(this.data.recordList);
  },
})