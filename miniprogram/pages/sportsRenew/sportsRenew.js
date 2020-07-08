// miniprogram/pages/sportsRenew/sportsRenew.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Services from '../../services/index';
import Utils from '../../utils';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTimePicker: false,
    pickerDefaultTime: Utils.hhmm(new Date()),
    currentDay: Utils.yyyymmdd(new Date())
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