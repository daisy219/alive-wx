// miniprogram/pages/sportsRecord/sportsRecord.js
import Services from '../../services/index';
import Utils from '../../utils';

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
  onLoad: async function (options) {
    await this.getRecordList();
    this.showTimeList(Utils.yyyymmdd(new Date(), '/'));
  },

  /**
   * 点击日期
   */
  dayTouch(val) {
    this.showTimeList(val.detail.date)
  },

  /** 展示时间列表 */
  showTimeList(date) {
    const timeList = this.data.list.filter(a => a.date === date).map(a => a.time);
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