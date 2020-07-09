// miniprogram/pages/sports.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
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
    showTimePicker: false,
    pickerDefaultTime: Utils.hhmm(new Date()),
    currentDay: Utils.yyyymmdd(new Date(), '/')
  },
  /**
   * 打卡
   */
  async punch() {
    const params = {
      date: Utils.yyyymmdd(new Date(), '/'),
      time: Utils.hhmm(new Date()),
    }
    try {
      await Services.onAdd('punchRecord', params);
      Toast.success('打卡成功！');
      this.getRecordList();
    } catch (err) {
      Toast.fail('打卡失败');
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getRecordList();
  },

  /**
   * 点击日期
   */
  dayTouch(val) {
    this.setData({ currentDay: val.detail.date });
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
    await this.setData({list: result.data});
    await this.setData({recordList: result.data.map(a => a.date)});
    this.showTimeList(Utils.yyyymmdd(new Date(), '/'));
  },

  /**
   * 点击补卡
   */
  reNewClick: function() {
    if (Date.parse(this.data.currentDay) > Date.parse(new Date())) {
      Toast('日子还没到呢，补什么卡~');
      return;
    }
    this.setData({ showTimePicker: true });
  },
  /**
   * 确认选择时间
   */
  async onConfirmChooseTime(event) {
    // console.log(this.data.currentDay);
    // return;
    const params = {
      date: new Date(this.data.currentDay).getMonth(),
      time: event.detail,
    }
    try {
      await Services.onAdd('punchRecord', params);
      Toast.success('补卡成功！');
      this.getRecordList();
    } catch (err) {
      Toast.fail('补卡失败');
    }
    this.setData({ showTimePicker: false });
  },
  onCloseChooseTime() {
    this.setData({ showTimePicker: false });
  },
})